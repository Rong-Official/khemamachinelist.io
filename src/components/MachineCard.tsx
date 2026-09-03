import React, { useState } from 'react';
import { Check, Plus, ShoppingCart, Award } from 'lucide-react';
import { Machine } from '../types';
import { useQuotation } from '../context/QuotationContext';

interface MachineCardProps {
  machine: Machine;
}

export const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const { addToQuotation, items } = useQuotation();
  const [imgError, setImgError] = useState(false);

  // Check if machine is already in quotation
  const quotationItem = items.find((item) => item.machine.id === machine.id);
  const isInQuotation = Boolean(quotationItem);
  const currentQuantity = quotationItem?.quantity || 0;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(machine.price);

  return (
    <div
      id={`machine-card-${machine.id}`}
      className="group bg-white rounded-2xl border border-[#9FCFE6]/30 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
      style={{
        boxShadow: '0 8px 30px rgba(22, 58, 95, 0.08)',
      }}
    >
      {/* Machine Image Container */}
      <div className="relative w-full h-56 bg-[#F6FAFD] overflow-hidden border-b border-[#9FCFE6]/20 flex items-center justify-center p-4">
        {/* Subtle decorative grid/glow */}
        <div className="absolute inset-0 bg-radial from-[#9FCFE6]/20 to-transparent pointer-events-none opacity-60" />

        {!imgError ? (
          <img
            src={machine.image}
            alt={machine.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F6FAFD] to-[#EAF6FC] rounded-xl border border-dashed border-[#9FCFE6]">
            <div className="w-12 h-12 rounded-full bg-[#9FCFE6]/30 flex items-center justify-center text-[#2563EB] mb-2">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-[#163A5F]">{machine.brand}</span>
            <span className="text-[11px] text-[#64748B]">{machine.type}</span>
          </div>
        )}

        {/* Brand Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide bg-white/90 backdrop-blur-xs text-[#163A5F] border border-[#9FCFE6]/50 shadow-xs">
            {machine.brand}
          </span>
        </div>

        {/* In-quotation pill if added */}
        {isInQuotation && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#2563EB] text-white shadow-xs animate-in fade-in">
              <Check className="w-3 h-3 stroke-[3]" />
              In Quotation ({currentQuantity})
            </span>
          </div>
        )}
      </div>

      {/* Machine Card Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Machine Type */}
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
            {machine.type}
          </div>

          {/* Machine Name */}
          <h3 className="text-lg sm:text-xl font-bold text-[#163A5F] group-hover:text-[#2563EB] transition-colors leading-snug">
            {machine.name}
          </h3>

          {/* Key Features */}
          <div className="mt-4 space-y-2">
            {machine.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#64748B]">
                <div className="w-4 h-4 rounded-full bg-[#9FCFE6]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#2563EB]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-6 pt-4 border-t border-[#9FCFE6]/20 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-medium text-[#64748B] block">Catalog Price</span>
            <span className="text-xl sm:text-2xl font-black text-[#163A5F] tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <button
            id={`add-to-quote-btn-${machine.id}`}
            onClick={() => addToQuotation(machine)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-98 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
            aria-label={`Add ${machine.name} to quotation`}
          >
            {isInQuotation ? (
              <>
                <Plus className="w-4 h-4" />
                <span>Add More</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>+ Add to Quotation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
