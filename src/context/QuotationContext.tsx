import React, { createContext, useContext, useEffect, useState } from 'react';
import { CustomerInfo, Machine, QuotationItem } from '../types';

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  machineName?: string;
  type?: 'success' | 'info' | 'warning';
}

interface QuotationContextType {
  items: QuotationItem[];
  customerInfo: CustomerInfo;
  quotationNumber: string;
  quotationDate: string;
  totalQuantity: number;
  subtotal: number;
  grandTotal: number;
  addToQuotation: (machine: Machine) => void;
  updateQuantity: (machineId: string, delta: number) => void;
  removeFromQuotation: (machineId: string) => void;
  clearQuotation: () => void;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
}

const STORAGE_KEY_ITEMS = 'khema_quotation_items';
const STORAGE_KEY_CUSTOMER = 'khema_customer_info';
const STORAGE_KEY_META = 'khema_quotation_meta';

const initialCustomerInfo: CustomerInfo = {
  customerName: '',
  companyName: '',
  phone: '',
  email: '',
  address: '',
};

const QuotationContext = createContext<QuotationContextType | undefined>(undefined);

export const QuotationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuotationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOMER);
      return saved ? JSON.parse(saved) : initialCustomerInfo;
    } catch {
      return initialCustomerInfo;
    }
  });

  const [quotationMeta, setQuotationMeta] = useState<{ number: string; date: string }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_META);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return {
      number: 'KHEMA-2026-001',
      date: dateStr,
    };
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save quotation items to localStorage', e);
    }
  }, [items]);

  // Sync customerInfo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMER, JSON.stringify(customerInfo));
    } catch (e) {
      console.error('Failed to save customer info to localStorage', e);
    }
  }, [customerInfo]);

  // Sync metadata
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_META, JSON.stringify(quotationMeta));
    } catch (e) {
      console.error('Failed to save quotation meta to localStorage', e);
    }
  }, [quotationMeta]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToQuotation = (machine: Machine) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.machine.id === machine.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        addToast({
          title: 'Quantity Updated',
          message: `Increased quantity of ${machine.name} to ${next[existingIndex].quantity}`,
          machineName: machine.name,
          type: 'success',
        });
        return next;
      } else {
        addToast({
          title: 'Added to Quotation',
          message: `${machine.name} has been added to your quotation`,
          machineName: machine.name,
          type: 'success',
        });
        return [...prev, { machine, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (machineId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.machine.id === machineId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromQuotation = (machineId: string) => {
    const target = items.find((i) => i.machine.id === machineId);
    setItems((prev) => prev.filter((item) => item.machine.id !== machineId));
    if (target) {
      addToast({
        title: 'Machine Removed',
        message: `${target.machine.name} was removed from quotation`,
        type: 'info',
      });
    }
  };

  const clearQuotation = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY_ITEMS);
    } catch {
      // ignore
    }
    addToast({
      title: 'Quotation Cleared',
      message: 'All machines have been removed from your quotation',
      type: 'info',
    });
  };

  const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
    setCustomerInfo((prev) => ({ ...prev, ...info }));
  };

  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.machine.price * curr.quantity, 0);
  const grandTotal = subtotal; // Can add tax/discount if needed, currently direct total

  return (
    <QuotationContext.Provider
      value={{
        items,
        customerInfo,
        quotationNumber: quotationMeta.number,
        quotationDate: quotationMeta.date,
        totalQuantity,
        subtotal,
        grandTotal,
        addToQuotation,
        updateQuantity,
        removeFromQuotation,
        clearQuotation,
        updateCustomerInfo,
        toasts,
        dismissToast,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
};

export const useQuotation = () => {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error('useQuotation must be used within a QuotationProvider');
  }
  return context;
};
