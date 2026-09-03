import React, { useState, useMemo } from 'react';
import { Search, X, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { BrandType, MachineCategoryType } from '../types';
import { MACHINES } from '../data/machines';
import { MachineCard } from '../components/MachineCard';

interface MachineListPageProps {
  initialCategory?: MachineCategoryType;
}

export const MachineListPage: React.FC<MachineListPageProps> = ({ initialCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<BrandType>('All Brands');
  const [selectedCategory, setSelectedCategory] = useState<MachineCategoryType>(
    initialCategory || 'All Types'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const brands: BrandType[] = ['All Brands', 'Aidite', 'Shining 3D', 'Ivoclar', 'Other'];

  const categories: MachineCategoryType[] = [
    'All Types',
    'Milling Machine',
    'Zirconia Furnace',
    'Porcelain Furnace',
    'Ceramic Furnace',
    '3D Printer',
    'Cure',
    'Laboratory Equipment',
  ];

  // Filtering logic: search by machine name, brand, or machine type
  const filteredMachines = useMemo(() => {
    return MACHINES.filter((machine) => {
      // 1. Brand filter
      if (selectedBrand !== 'All Brands' && machine.brand !== selectedBrand) {
        return false;
      }

      // 2. Category / Machine Type filter
      if (selectedCategory !== 'All Types' && machine.category !== selectedCategory) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = machine.name.toLowerCase().includes(query);
        const matchesBrand = machine.brand.toLowerCase().includes(query);
        const matchesType = machine.type.toLowerCase().includes(query);
        const matchesFeatures = machine.features.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesType && !matchesFeatures) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [searchQuery, selectedBrand, selectedCategory, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedBrand !== 'All Brands' || selectedCategory !== 'All Types';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All Brands');
    setSelectedCategory('All Types');
    setSortBy('featured');
  };

  return (
    <div id="machine-list-page" className="pb-20">
      {/* 1. PAGE HEADER */}
      <section
        id="machine-list-header"
        className="bg-gradient-to-br from-[#F6FAFD] via-[#EAF6FC] to-[#F6FAFD] border-b border-[#9FCFE6]/30 py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Equipment Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#163A5F] tracking-tight mt-1">
              Our Machine Collection
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-3 leading-relaxed">
              Explore professional digital dental equipment and find the right technology for your dental
              laboratory or clinic. Compare specifications and add machinery directly to your quotation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <section id="search-filter-controls" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div
          className="bg-white rounded-2xl border border-[#9FCFE6]/40 p-4 sm:p-6 space-y-6 shadow-md"
          style={{
            boxShadow: '0 8px 30px rgba(22, 58, 95, 0.08)',
          }}
        >
          {/* Top Row: Search input + Sorting */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search System */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                <Search className="w-5 h-5 text-[#2563EB]" />
              </div>
              <input
                id="machine-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search machines by name, brand, or machine type (e.g. Aidite, Milling, Furnace)..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/40 text-sm text-[#1E293B] placeholder-[#64748B] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#64748B] hover:text-[#163A5F]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="sort-select" className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Sort by:</span>
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 rounded-xl bg-[#F6FAFD] border border-[#9FCFE6]/40 text-xs font-semibold text-[#163A5F] focus:outline-hidden focus:border-[#2563EB]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Machine Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Filters Row */}
          <div className="pt-2 border-t border-[#9FCFE6]/20 space-y-4">
            {/* Brand Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#163A5F] w-28 shrink-0 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#2563EB]" />
                Brand:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {brands.map((brand) => {
                  const isSelected = selectedBrand === brand;
                  return (
                    <button
                      key={brand}
                      id={`brand-filter-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'bg-[#F6FAFD] text-[#163A5F] hover:bg-[#9FCFE6]/20 border border-[#9FCFE6]/30'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Machine Type Filter */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#163A5F] w-28 shrink-0 pt-1 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
                Machine Type:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      id={`category-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-[#163A5F] text-white shadow-xs'
                          : 'bg-[#F6FAFD] text-[#163A5F] hover:bg-[#9FCFE6]/20 border border-[#9FCFE6]/30'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Filter summary + Reset button */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#64748B]">
            <div>
              Showing <span className="font-bold text-[#163A5F]">{filteredMachines.length}</span> of{' '}
              <span className="font-semibold">{MACHINES.length}</span> digital dental machines
            </div>

            {hasActiveFilters && (
              <button
                id="reset-all-filters-btn"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. MACHINE CARD GRID (3 desktop, 2 tablet, 1 mobile) */}
      <section id="machines-catalog-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredMachines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMachines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#9FCFE6]/30 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#9FCFE6]/20 flex items-center justify-center text-[#2563EB] mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#163A5F]">No machines matched your criteria</h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              Try adjusting your search query or clear the brand and category filters to browse all available
              dental equipment.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
