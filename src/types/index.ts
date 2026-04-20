// AbujaStays — Type Definitions

export interface Listing {
  id: string;
  title: string;
  description: string;
  location: {
    area: string;
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  pricePerNight: number;
  maxGuests: number;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  type: 'flat' | 'house' | 'room' | 'apartment';
  houseRules: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  available: boolean;
  superhost?: boolean;
}

export interface Booking {
  id: string;
  listingId: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  serviceFee: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reference: string;
  createdAt: string;
}

export interface Review {
  id: string;
  listingId: string;
  bookingId: string;
  guestName: string;
  avatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SearchFilters {
  location: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  type: string;
  minPrice: number;
  maxPrice: number;
}

export type Amenity =
  | 'wifi' | 'ac' | 'parking' | 'kitchen'
  | 'pool' | 'gym' | 'security' | 'generator'
  | 'water' | 'cleaning' | 'balcony' | 'tv'
  | 'washer' | 'workspace';

export const AMENITY_LABELS: Record<Amenity, string> = {
  wifi: 'Fast WiFi',
  ac: 'Air Conditioning',
  parking: 'Free Parking',
  kitchen: 'Full Kitchen',
  pool: 'Swimming Pool',
  gym: 'Gym Access',
  security: '24/7 Security',
  generator: 'Steady Power',
  water: 'Constant Water',
  cleaning: 'Professional Cleaning',
  balcony: 'Balcony',
  tv: 'Smart TV',
  washer: 'Washer/Dryer',
  workspace: 'Dedicated Workspace',
};

export const ABUJA_AREAS = [
  'Maitama', 'Wuse', 'Garki', 'Asokoro', 'Jabi',
  'Utako', 'Wuye', 'Gwagwalada', 'Kuje', 'Lokogoma',
  'Mabushi', 'Katampe', 'Cadastral Zone', 'Central Business District',
] as const;

export type AbujaArea = typeof ABUJA_AREAS[number];