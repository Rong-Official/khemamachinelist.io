import React, { useState } from 'react';
import { PageType, MachineCategoryType } from './types';
import { QuotationProvider } from './context/QuotationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { MachineListPage } from './pages/MachineListPage';
import { QuotationPage } from './pages/QuotationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<MachineCategoryType | undefined>(
    undefined
  );

  const handleNavigate = (page: PageType, categoryFilter?: MachineCategoryType) => {
    setCurrentPage(page);
    setActiveCategoryFilter(categoryFilter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <QuotationProvider>
      <div className="min-h-screen flex flex-col bg-[#F6FAFD] text-[#1E293B]">
        {/* Sticky Top Navigation */}
        <Navbar currentPage={currentPage} onNavigate={(p) => handleNavigate(p)} />

        {/* Main View Area */}
        <main className="flex-1">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'machines' && (
            <MachineListPage key={activeCategoryFilter || 'all'} initialCategory={activeCategoryFilter} />
          )}
          {currentPage === 'quotation' && <QuotationPage onNavigate={handleNavigate} />}
        </main>

        {/* Professional Footer */}
        <Footer onNavigate={(p) => handleNavigate(p)} />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </QuotationProvider>
  );
}
