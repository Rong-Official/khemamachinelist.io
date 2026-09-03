import React, { useState } from 'react';
import { Sparkles, Menu, X, FileText, Cpu, ChevronRight } from 'lucide-react';
import { PageType } from '../types';
import { useQuotation } from '../context/QuotationContext';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { totalQuantity } = useQuotation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string; count?: number }[] = [
    { id: 'home', label: 'Home' },
    { id: 'machines', label: 'Machine List' },
    { id: 'quotation', label: 'Quotation', count: totalQuantity },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar-header"
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#9FCFE6]/30 shadow-xs transition-all no-print"
      style={{
        boxShadow: '0 4px 20px -2px rgba(22, 58, 95, 0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white shadow-md shadow-[#2563EB]/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#38BDF8]"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#163A5F] group-hover:text-[#2563EB] transition-colors">
                Khema
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#64748B]">
                Digital Dental Solution
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'text-[#2563EB] bg-[#F6FAFD]'
                      : 'text-[#163A5F] hover:text-[#2563EB] hover:bg-[#F6FAFD]/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'quotation' && (
                    <span
                      id="nav-quotation-badge"
                      className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full transition-all duration-300 ${
                        totalQuantity > 0
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'bg-[#9FCFE6]/30 text-[#163A5F]'
                      }`}
                    >
                      {totalQuantity}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#2563EB] rounded-full animate-in fade-in" />
                  )}
                </button>
              );
            })}

            {/* Quick Quotation Action button on desktop */}
            <button
              id="nav-quick-quote-action"
              onClick={() => handleNavClick('quotation')}
              className="ml-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl shadow-xs hover:shadow-md transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>Review Quotation</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-quotation-badge-btn"
              onClick={() => handleNavClick('quotation')}
              className="relative p-2 rounded-lg text-[#163A5F] hover:bg-[#F6FAFD]"
              aria-label="View quotation"
            >
              <FileText className="w-6 h-6 text-[#2563EB]" />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#2563EB] rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#163A5F] hover:bg-[#F6FAFD] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-[#9FCFE6]/30 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'text-[#2563EB] bg-[#F6FAFD]'
                    : 'text-[#163A5F] hover:bg-[#F6FAFD]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.id === 'home' && <Cpu className="w-5 h-5 text-[#2563EB]" />}
                  {item.id === 'machines' && <Sparkles className="w-5 h-5 text-[#2563EB]" />}
                  {item.id === 'quotation' && <FileText className="w-5 h-5 text-[#2563EB]" />}
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.id === 'quotation' && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#2563EB] text-white">
                      {totalQuantity}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#64748B]" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
