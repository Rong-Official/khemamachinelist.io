import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useQuotation } from '../context/QuotationContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useQuotation();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-notifications-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none toast-container no-print"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto bg-white border border-[#9FCFE6]/40 rounded-xl shadow-lg p-4 flex items-start gap-3 transition-all duration-300 transform translate-y-0"
          style={{
            boxShadow: '0 10px 25px -5px rgba(22, 58, 95, 0.12), 0 8px 10px -6px rgba(22, 58, 95, 0.06)',
          }}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="w-8 h-8 rounded-lg bg-[#9FCFE6]/20 flex items-center justify-center text-[#163A5F]">
                <Info className="w-5 h-5" />
              </div>
            )}
            {toast.type === 'warning' && (
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#163A5F]">{toast.title}</h4>
            <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{toast.message}</p>
          </div>

          <button
            id={`dismiss-toast-${toast.id}`}
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-[#64748B] hover:text-[#163A5F] transition-colors p-1 rounded-md"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
