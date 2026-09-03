import React, { useState } from 'react';
import {
  Printer,
  Trash2,
  Plus,
  Minus,
  AlertTriangle,
  ArrowRight,
  FileText,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { PageType } from '../types';
import { useQuotation } from '../context/QuotationContext';

interface QuotationPageProps {
  onNavigate: (page: PageType) => void;
}

export const QuotationPage: React.FC<QuotationPageProps> = ({ onNavigate }) => {
  const {
    items,
    customerInfo,
    quotationNumber,
    quotationDate,
    totalQuantity,
    subtotal,
    grandTotal,
    updateQuantity,
    removeFromQuotation,
    clearQuotation,
    updateCustomerInfo,
  } = useQuotation();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [machineToRemove, setMachineToRemove] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const confirmClearAll = () => {
    clearQuotation();
    setShowClearConfirm(false);
  };

  const confirmRemoveSingle = () => {
    if (machineToRemove) {
      removeFromQuotation(machineToRemove);
      setMachineToRemove(null);
    }
  };

  return (
    <div id="quotation-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Printable Quotation Sheet Wrapper */}
      <div
        id="printable-quotation-sheet"
        className="bg-white rounded-3xl border border-[#9FCFE6]/40 p-6 sm:p-10 lg:p-12 shadow-lg"
        style={{
          boxShadow: '0 8px 30px rgba(22, 58, 95, 0.08)',
        }}
      >
        {/* 1. QUOTATION HEADER */}
        <header
          id="quotation-header-section"
          className="pb-8 border-b border-[#9FCFE6]/30 flex flex-col md:flex-row md:items-start justify-between gap-6"
        >
          {/* Company branding */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#163A5F] tracking-tight">
                Khema Digital Dental Solution
              </h1>
            </div>
            <p className="text-sm font-semibold text-[#2563EB] tracking-wide">
              Digital Dental Equipment & Solutions
            </p>
            <p className="text-xs text-[#64748B] pt-1">
              Authorized Supplier of Aidite, Shining 3D & Ivoclar Laboratory Systems
            </p>
          </div>

          {/* Quotation Details */}
          <div className="bg-[#F6FAFD] p-4 rounded-2xl border border-[#9FCFE6]/40 min-w-[240px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Quotation No:</span>
              <span id="display-quotation-number" className="font-bold text-[#163A5F]">
                {quotationNumber}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Date:</span>
              <span id="display-quotation-date" className="font-bold text-[#163A5F]">
                {quotationDate}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Status:</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#9FCFE6]/30 text-[#163A5F]">
                OFFICIAL PROPOSAL
              </span>
            </div>
          </div>
        </header>

        {/* 2. CUSTOMER INFORMATION FORM */}
        <section id="customer-information-section" className="py-8 border-b border-[#9FCFE6]/30">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#163A5F] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#2563EB]" />
                Customer & Laboratory Information
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Saved automatically to your device for official quotation printing.
              </p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customer-name-input"
                  className="block text-xs font-bold text-[#163A5F] mb-1.5 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#2563EB]" />
                  Customer Name
                </label>
                <input
                  id="customer-name-input"
                  type="text"
                  value={customerInfo.customerName}
                  onChange={(e) => updateCustomerInfo({ customerName: e.target.value })}
                  placeholder="Dr. Alexander Wright / Lab Director"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/40 text-sm text-[#1E293B] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              {/* Company / Clinic Name */}
              <div>
                <label
                  htmlFor="company-name-input"
                  className="block text-xs font-bold text-[#163A5F] mb-1.5 flex items-center gap-1.5"
                >
                  <Building className="w-3.5 h-3.5 text-[#2563EB]" />
                  Company / Clinic Name
                </label>
                <input
                  id="company-name-input"
                  type="text"
                  value={customerInfo.companyName}
                  onChange={(e) => updateCustomerInfo({ companyName: e.target.value })}
                  placeholder="Apex Digital Dental Laboratory LLC"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/40 text-sm text-[#1E293B] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone-input"
                  className="block text-xs font-bold text-[#163A5F] mb-1.5 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                  Phone Number
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                  placeholder="+1 (555) 438-9201"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/40 text-sm text-[#1E293B] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email-input"
                  className="block text-xs font-bold text-[#163A5F] mb-1.5 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => updateCustomerInfo({ email: e.target.value })}
                  placeholder="procurement@apexdentallab.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/40 text-sm text-[#1E293B] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address-input"
                  className="block text-xs font-bold text-[#163A5F] mb-1.5 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                  Delivery & Installation Address
                </label>
                <input
                  id="address-input"
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => updateCustomerInfo({ address: e.target.value })}
                  placeholder="Suite 400, 782 Medical Center Blvd, Los Angeles, CA 90024"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/40 text-sm text-[#1E293B] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>
          </form>
        </section>

        {/* 3. QUOTATION TABLE */}
        <section id="quotation-table-section" className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#163A5F] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2563EB]" />
              Selected Dental Machines ({items.length})
            </h2>

            {items.length > 0 && (
              <button
                id="clear-all-quotation-btn"
                onClick={() => setShowClearConfirm(true)}
                className="no-print inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {items.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-[#9FCFE6]/40 bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F6FAFD] border-b border-[#9FCFE6]/40 text-[11px] font-extrabold uppercase tracking-wider text-[#163A5F]">
                    <th className="py-3.5 px-4 w-12 text-center">No.</th>
                    <th className="py-3.5 px-4 min-w-[200px]">Machine</th>
                    <th className="py-3.5 px-4">Brand</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4 text-right">Unit Price</th>
                    <th className="py-3.5 px-4 text-center">Quantity</th>
                    <th className="py-3.5 px-4 text-right">Total</th>
                    <th className="py-3.5 px-4 w-16 text-center no-print">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#9FCFE6]/20 text-xs sm:text-sm">
                  {items.map((item, index) => {
                    const rowTotal = item.machine.price * item.quantity;
                    return (
                      <tr
                        key={item.machine.id}
                        id={`quotation-row-${item.machine.id}`}
                        className="hover:bg-[#F6FAFD]/70 transition-colors"
                      >
                        {/* No. */}
                        <td className="py-4 px-4 text-center font-bold text-[#64748B]">
                          {index + 1}
                        </td>

                        {/* Machine */}
                        <td className="py-4 px-4 font-bold text-[#163A5F]">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.machine.image}
                              alt={item.machine.name}
                              className="w-10 h-10 rounded-lg object-cover bg-[#F6FAFD] border border-[#9FCFE6]/40 shrink-0"
                            />
                            <div>
                              <span className="block font-bold leading-snug">{item.machine.name}</span>
                              <span className="text-[11px] font-normal text-[#64748B] block">
                                Model: {item.machine.modelCode || 'STD'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Brand */}
                        <td className="py-4 px-4">
                          <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-md bg-[#9FCFE6]/25 text-[#163A5F]">
                            {item.machine.brand}
                          </span>
                        </td>

                        {/* Type */}
                        <td className="py-4 px-4 text-[#64748B] font-medium">{item.machine.type}</td>

                        {/* Unit Price */}
                        <td className="py-4 px-4 text-right font-semibold text-[#163A5F]">
                          {formatCurrency(item.machine.price)}
                        </td>

                        {/* Quantity Controls */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center border border-[#9FCFE6]/60 rounded-xl bg-[#F6FAFD] p-1">
                            <button
                              id={`decrease-qty-${item.machine.id}`}
                              onClick={() => updateQuantity(item.machine.id, -1)}
                              disabled={item.quantity <= 1}
                              className="no-print w-6 h-6 rounded-lg flex items-center justify-center text-[#163A5F] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-[#163A5F]">
                              {item.quantity}
                            </span>
                            <button
                              id={`increase-qty-${item.machine.id}`}
                              onClick={() => updateQuantity(item.machine.id, 1)}
                              className="no-print w-6 h-6 rounded-lg flex items-center justify-center text-[#163A5F] hover:bg-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-4 px-4 text-right font-bold text-[#163A5F]">
                          {formatCurrency(rowTotal)}
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-center no-print">
                          <button
                            id={`remove-machine-btn-${item.machine.id}`}
                            onClick={() => setMachineToRemove(item.machine.id)}
                            className="p-1.5 rounded-lg text-[#64748B] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove machine from quotation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#F6FAFD] rounded-2xl border border-dashed border-[#9FCFE6] space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#9FCFE6]/40 flex items-center justify-center text-[#2563EB] mx-auto shadow-xs">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-bold text-[#163A5F]">Your Quotation is Currently Empty</h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Browse our catalog of digital milling machines, furnaces, 3D printers, and laboratory
                  equipment to construct your tailored quotation.
                </p>
              </div>
              <button
                id="empty-state-browse-machines-btn"
                onClick={() => onNavigate('machines')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#2563EB] hover:bg-[#1d4ed8] shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>Browse Machine Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* 4. QUOTATION SUMMARY CARD & ACTIONS */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-[#9FCFE6]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Notes & Terms (Prints cleanly on quotation) */}
            <div className="lg:col-span-7 space-y-3 text-xs text-[#64748B] bg-[#F6FAFD]/60 p-5 rounded-2xl border border-[#9FCFE6]/30">
              <h4 className="font-bold text-[#163A5F] uppercase tracking-wider text-[11px]">
                Quotation Terms & Technical Scope
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Pricing includes factory warranty, initial calibration, and authorized technical support.</li>
                <li>Quotation validity: 30 days from issuance date ({quotationDate}).</li>
                <li>Lead time and on-site clinical installation subject to lab site preparation requirements.</li>
                <li>Consumable tool sets, sintering trays, and CAM post-processors supplied per agreement.</li>
              </ul>
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-5">
              <div
                id="quotation-summary-card"
                className="bg-gradient-to-br from-[#F6FAFD] to-[#EAF6FC] p-6 rounded-2xl border border-[#9FCFE6]/60 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between text-sm text-[#64748B]">
                  <span>Subtotal:</span>
                  <span id="quotation-subtotal-display" className="font-semibold text-[#163A5F]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#64748B]">
                  <span>Total Items:</span>
                  <span id="quotation-total-items-display" className="font-semibold text-[#163A5F]">
                    {totalQuantity} {totalQuantity === 1 ? 'unit' : 'units'}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#9FCFE6]/40 flex items-baseline justify-between">
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2563EB]">
                      Grand Total
                    </span>
                    <span className="text-[11px] text-[#64748B]">USD Currency</span>
                  </div>
                  <span
                    id="quotation-grand-total-display"
                    className="text-2xl sm:text-3xl font-black text-[#163A5F] tracking-tight"
                  >
                    {formatCurrency(grandTotal)}
                  </span>
                </div>

                {/* Print & Action Buttons */}
                <div className="pt-3 space-y-2 no-print">
                  <button
                    id="print-quotation-action-btn"
                    onClick={handlePrint}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Quotation</span>
                  </button>

                  <button
                    id="add-more-machines-btn"
                    onClick={() => onNavigate('machines')}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-[#163A5F] bg-white hover:bg-[#F6FAFD] border border-[#9FCFE6]/40 transition-colors cursor-pointer"
                  >
                    <span>+ Add More Machines</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Clearing Entire Quotation */}
      {showClearConfirm && (
        <div
          id="clear-confirm-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163A5F]/40 backdrop-blur-xs no-print animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-3xl border border-[#9FCFE6]/50 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#163A5F]">Clear Entire Quotation?</h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
                This will remove all {items.length} machines from your saved quotation and reset the
                quotation counter. This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                id="cancel-clear-btn"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#163A5F] hover:bg-[#F6FAFD] transition-colors"
              >
                Cancel
              </button>
              <button
                id="confirm-clear-btn"
                onClick={confirmClearAll}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Clear Quotation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Removing Single Machine */}
      {machineToRemove && (
        <div
          id="remove-item-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163A5F]/40 backdrop-blur-xs no-print animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-3xl border border-[#9FCFE6]/50 p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#163A5F]">Remove Machine?</h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
                Are you sure you want to remove this equipment item from your quotation?
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                id="cancel-remove-item-btn"
                onClick={() => setMachineToRemove(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#163A5F] hover:bg-[#F6FAFD] transition-colors"
              >
                Keep Item
              </button>
              <button
                id="confirm-remove-item-btn"
                onClick={confirmRemoveSingle}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
