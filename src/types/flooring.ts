export type FlooringCategory =
  | 'luxury-vinyl'
  | 'porcelain'
  | 'marble'
  | 'ceramic'
  | 'granite'
  | 'slate'
  | 'laminate'
  | 'engineered-hardwood'
  | 'backsplash-wall'
  | 'accessories'
  | 'diy-tools';

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  category: FlooringCategory;
  categoryLabel: string;
  subCategory?: string;
  price: number;
  unit: 'Sq.ft' | 'Piece' | 'Box';
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  dimensions: string;
  thickness?: string;
  finish: string;
  material: string;
  coveragePerBox?: number; // in sq ft
  piecesPerBox?: number;
  freeSampleEligible: boolean;
  samplePrice?: number;
  inStock: boolean;
  leadTime: string;
  description: string;
  specifications: Record<string, string>;
  isFeatured?: boolean;
  isBestseller?: boolean;
  tags?: string[];
  roomType?: ('living' | 'kitchen' | 'bathroom' | 'commercial' | 'bedroom')[];
  finishGroup?: 'natural-oak' | 'warm-walnut' | 'light-stone' | 'marble' | 'dark-stone';
}

export interface CartItem {
  product: Product;
  quantity: number; // boxes or pieces
  sqftCalculated?: number;
  isSample?: boolean;
}

export interface SampleItem {
  product: Product;
  addedAt: number;
}

export interface FilterState {
  category: string;
  material: string[];
  finish: string[];
  finishGroup: string[];
  thickness: string[];
  priceRange: [number, number];
  freeSampleOnly: boolean;
  searchQuery: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc';
