import React from 'react';
import { Sparkles, ShieldCheck, Clock, Headphones } from 'lucide-react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-site-footer" className="bg-white border-t border-[#9FCFE6]/30 mt-20 no-print">
      {/* Top Value Ribbon */}
      <div className="border-b border-[#9FCFE6]/20 bg-[#F6FAFD]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#163A5F]">Genuine Equipment Warranty</h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Direct authorized distribution with factory warranties and calibration.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#9FCFE6]/20 flex items-center justify-center text-[#163A5F] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#163A5F]">Rapid Quotation Turnaround</h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Instant itemized quotations tailored for dental clinics & laboratories.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#163A5F]">Technical Installation & Support</h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Full workflow integration, CAM software onboarding & on-site maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-[#163A5F] block leading-tight">
                  Khema Digital Dental Solution
                </span>
                <span className="text-xs text-[#64748B]">
                  Advanced Dental Machines & Digital Workflows
                </span>
              </div>
            </div>
            <p className="text-sm text-[#64748B] max-w-md leading-relaxed">
              Providing premier digital dentistry systems including 5-axis milling machines, zirconia
              sintering furnaces, clinical 3D printers, and dental laboratory equipment for precision
              restorations.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#163A5F]">Navigation</h5>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2563EB] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('machines');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2563EB] transition-colors"
                >
                  Machine List & Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('quotation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#2563EB] transition-colors"
                >
                  Quotation System
                </button>
              </li>
            </ul>
          </div>

          {/* Dental Brands */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#163A5F]">
              Authorized Technology
            </h5>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Certified equipment distributor for Aidite, Shining 3D, and Ivoclar Vivadent digital
              restorative machinery.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#F6FAFD] text-[#163A5F] border border-[#9FCFE6]/40">
                Aidite
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#F6FAFD] text-[#163A5F] border border-[#9FCFE6]/40">
                Shining 3D
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#F6FAFD] text-[#163A5F] border border-[#9FCFE6]/40">
                Ivoclar Vivadent
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#9FCFE6]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Khema Digital Dental Solution. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Digital Dental Machine Catalog & Instant Quotation System
          </p>
        </div>
      </div>
    </footer>
  );
};
