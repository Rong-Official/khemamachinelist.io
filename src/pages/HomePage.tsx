import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Flame,
  Printer,
  SunMedium,
  Wrench,
  ShieldCheck,
  CheckCircle,
  FileText,
  Activity,
  Award,
} from 'lucide-react';
import { MachineCategoryType, PageType } from '../types';
import { MACHINES } from '../data/machines';
import { MachineCard } from '../components/MachineCard';

interface HomePageProps {
  onNavigate: (page: PageType, categoryFilter?: MachineCategoryType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Select 4 representative featured machines
  const featuredMachines = MACHINES.filter((m) => m.featured).slice(0, 4);

  const categories: {
    title: string;
    description: string;
    categoryKey: MachineCategoryType;
    icon: React.ReactNode;
  }[] = [
    {
      title: 'Milling Machines',
      description: 'Wet, dry, and wet/dry milling solutions for zirconia, wax, PMMA, and titanium.',
      categoryKey: 'Milling Machine',
      icon: <Cpu className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      title: 'Dental Furnaces',
      description: 'Zirconia, porcelain, and ceramic sintering with precise thermal management.',
      categoryKey: 'Zirconia Furnace',
      icon: <Flame className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      title: 'Dental 3D Printers',
      description: 'Professional digital dental manufacturing for models, surgical guides, and splints.',
      categoryKey: '3D Printer',
      icon: <Printer className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      title: 'Curing Machines',
      description: 'Post-processing and curing solutions ensuring optimal mechanical polymer properties.',
      categoryKey: 'Cure',
      icon: <SunMedium className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      title: 'Laboratory Equipment',
      description: 'Supporting equipment for professional dental laboratories including dry air and suction.',
      categoryKey: 'Laboratory Equipment',
      icon: <Wrench className="w-6 h-6 text-[#2563EB]" />,
    },
  ];

  const whyChooseItems = [
    {
      title: 'Advanced Technology',
      description: 'Professional equipment for modern digital dentistry.',
      icon: <Sparkles className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      title: 'Reliable Equipment',
      description: 'High-quality machines from trusted dental technology brands.',
      icon: <ShieldCheck className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      title: 'Complete Digital Solutions',
      description: 'From milling and furnaces to 3D printing and laboratory equipment.',
      icon: <Activity className="w-6 h-6 text-[#2563EB]" />,
    },
    {
      title: 'Easy Quotation System',
      description: 'Select machines and automatically build your quotation.',
      icon: <FileText className="w-6 h-6 text-[#2563EB]" />,
    },
  ];

  return (
    <div id="home-page-container" className="space-y-20 pb-12">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-gradient-to-br from-[#F6FAFD] via-[#EAF6FC] to-[#F6FAFD] border-b border-[#9FCFE6]/30 py-16 sm:py-24"
      >
        {/* Subtle background ambient geometric circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#9FCFE6]/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#2563EB]/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#9FCFE6]/60 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-[#2563EB]" />
                <span className="text-xs font-bold tracking-wide uppercase text-[#163A5F]">
                  Digital Dental Equipment Specialist
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#163A5F] tracking-tight leading-[1.12]">
                Advanced Digital Dental Solutions
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#64748B] max-w-2xl leading-relaxed font-normal">
                Discover professional digital dental equipment designed to improve precision,
                productivity, efficiency, and workflow for modern dental laboratories and clinics.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="hero-explore-machines-btn"
                  onClick={() => onNavigate('machines')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Machines</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  id="hero-create-quotation-btn"
                  onClick={() => onNavigate('quotation')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-[#163A5F] bg-white hover:bg-[#F6FAFD] border border-[#9FCFE6]/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                  <span>Create Quotation</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#64748B]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2563EB]" />
                  <span>Aidite & Shining 3D Authorized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2563EB]" />
                  <span>Instant Quotation Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2563EB]" />
                  <span>Laboratory Grade Precision</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative bg-white p-4 rounded-3xl border border-[#9FCFE6]/40 shadow-xl overflow-hidden"
                style={{
                  boxShadow: '0 20px 40px -15px rgba(22, 58, 95, 0.12)',
                }}
              >
                {/* Hero Machine Preview */}
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-[#F6FAFD]">
                  <img
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
                    alt="Digital Dental Milling Machine"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#163A5F]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#9FCFE6]">
                      Featured Milling Solution
                    </span>
                    <h3 className="text-xl font-bold">Aidite AMM-530 Wet/Dry System</h3>
                    <p className="text-xs text-slate-200 mt-1">
                      High precision 5-axis restoration milling for laboratories
                    </p>
                  </div>
                </div>

                {/* Micro tech badge strip */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/30 text-center">
                    <span className="block text-[11px] text-[#64748B]">Milling</span>
                    <span className="text-xs font-bold text-[#163A5F]">5-Axis CNC</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/30 text-center">
                    <span className="block text-[11px] text-[#64748B]">Tolerance</span>
                    <span className="text-xs font-bold text-[#2563EB]">± 5 μm</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/30 text-center">
                    <span className="block text-[11px] text-[#64748B]">Workflow</span>
                    <span className="text-xs font-bold text-[#163A5F]">Full Digital</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED MACHINE CATEGORIES */}
      <section id="machine-categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Comprehensive Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163A5F] mt-1">
            Featured Machine Categories
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Explore dedicated equipment categories engineered for seamless digital restorative dental workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              id={`category-card-${idx}`}
              onClick={() => onNavigate('machines', cat.categoryKey)}
              className="group bg-white p-6 rounded-2xl border border-[#9FCFE6]/30 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/40 cursor-pointer"
              style={{
                boxShadow: '0 8px 30px rgba(22, 58, 95, 0.05)',
              }}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#9FCFE6]/25 group-hover:bg-[#2563EB]/10 flex items-center justify-center transition-colors mb-4">
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-[#163A5F] group-hover:text-[#2563EB] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#9FCFE6]/20 flex items-center gap-1 text-xs font-semibold text-[#2563EB] group-hover:gap-2 transition-all">
                <span>View Models</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED MACHINES */}
      <section id="featured-machines-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Handpicked High Performers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163A5F] mt-1">
              Featured Machines
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Top-selling digital milling, sintering furnaces, and 3D printing workstations.
            </p>
          </div>

          <button
            id="view-all-machines-link-btn"
            onClick={() => onNavigate('machines')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
          >
            <span>View All 15 Machines</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMachines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE KHEMA DIGITAL DENTAL SOLUTION */}
      <section
        id="why-choose-section"
        className="bg-white border-y border-[#9FCFE6]/30 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Built for Dental Professionals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163A5F] mt-1">
              Why Choose Khema Digital Dental Solution
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Empowering dental clinics and commercial laboratories with dependable digital technology,
              transparent pricing, and complete technical guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseItems.map((item, idx) => (
              <div
                key={idx}
                id={`why-choose-card-${idx}`}
                className="bg-[#F6FAFD] p-6 rounded-2xl border border-[#9FCFE6]/30 hover:border-[#2563EB]/30 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-[#9FCFE6]/40 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#163A5F]">{item.title}</h3>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section id="cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-white"
          style={{
            background: 'linear-gradient(135deg, #163A5F 0%, #2563EB 100%)',
            boxShadow: '0 20px 40px -15px rgba(22, 58, 95, 0.25)',
          }}
        >
          {/* Subtle tech background graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
            <Award className="w-96 h-96 -mr-20 text-white" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs text-white">
              Instant Quotation Engine
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Find the Right Digital Dental Solution for Your Laboratory
            </h2>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-light">
              Build an itemized machine quotation in seconds. Select any combination of dry/wet milling,
              sintering furnaces, 3D printers, and support equipment for your clinic or lab.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="cta-view-machine-list-btn"
                onClick={() => onNavigate('machines')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#163A5F] bg-white hover:bg-[#F6FAFD] shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>View Machine List</span>
                <ArrowRight className="w-4 h-4 text-[#2563EB]" />
              </button>

              <button
                id="cta-create-quotation-btn"
                onClick={() => onNavigate('quotation')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs border border-white/30 transition-all duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Create a Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
