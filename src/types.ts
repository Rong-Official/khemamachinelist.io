export type PageType = 'home' | 'machines' | 'quotation';

export type BrandType = 'All Brands' | 'Aidite' | 'Shining 3D' | 'Ivoclar' | 'Other';

export type MachineCategoryType =
  | 'All Types'
  | 'Milling Machine'
  | 'Zirconia Furnace'
  | 'Porcelain Furnace'
  | 'Ceramic Furnace'
  | '3D Printer'
  | 'Cure'
  | 'Laboratory Equipment';

export interface Machine {
  id: string;
  name: string;
  brand: 'Aidite' | 'Shining 3D' | 'Ivoclar' | 'Other';
  type: string;
  category: MachineCategoryType;
  price: number;
  features: string[];
  image: string;
  featured?: boolean;
  modelCode?: string;
  leadTime?: string;
}

export interface QuotationItem {
  machine: Machine;
  quantity: number;
}

export interface CustomerInfo {
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
}
