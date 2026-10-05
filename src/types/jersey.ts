export type League = 'All' | 'Premier League' | 'La Liga' | 'Serie A' | 'International' | 'Retro Archive';

export type KitType = 'All' | 'Home' | 'Away' | 'Third' | 'Retro' | 'Special';

export type KitEdition = 'Stadium Replica' | 'Matchday Player Issue';

export interface PlayerPreset {
  name: string;
  number: number;
}

export interface Jersey {
  id: string;
  title: string;
  club: string;
  league: Exclude<League, 'All'>;
  season: string;
  type: 'Home' | 'Away' | 'Third' | 'Retro' | 'Special';
  edition: KitEdition;
  price: number;
  originalPrice?: number;
  image: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  pattern: 'stripes' | 'solid' | 'pinstripes' | 'chevrons' | 'half' | 'sash' | 'camo';
  description: string;
  fabricDetails: string;
  playerPresets: PlayerPreset[];
  availableBadges: string[];
  inStock: boolean;
  featured?: boolean;
  badgeTag?: string;
}

export interface KitCustomization {
  name: string;
  number: string;
  fontStyle: 'modern' | 'retro-block' | 'continental';
  sleeveBadge?: string;
  view: 'back' | 'front';
}

export interface CartItem {
  id: string;
  jersey: Jersey;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  edition: KitEdition;
  customization?: {
    name: string;
    number: string;
    fontStyle: 'modern' | 'retro-block' | 'continental';
    sleeveBadge?: string;
  };
  quantity: number;
  unitPrice: number;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: 'Confirmed' | 'Kit Room Printing' | 'Quality Check' | 'Dispatched';
  estimatedDelivery: string;
}
