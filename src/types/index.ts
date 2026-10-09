export type ChemicalCategory =
  | 'Industrial & Manufacturing'
  | 'Water Treatment & Purification'
  | 'Soap & Detergent Raw Materials'
  | 'Cosmetics & Personal Care'
  | 'Food & Beverage Grade'
  | 'Laboratory & Analytical Reagents'
  | 'Agricultural & Agrochem';

export type ChemicalGrade =
  | 'Technical Grade'
  | 'Analytical Reagent (AR)'
  | 'Food Grade (USP/FCC)'
  | 'Cosmetic Grade'
  | 'Industrial Grade';

export interface Chemical {
  id: string;
  name: string;
  chemicalFormula: string;
  casNumber: string;
  category: string;
  grade: string;
  purity?: string;
  packaging: string;
  imageUrl: string;
  packageWeightKg?: number;
  priceNgn: number;
  inStock: boolean;
  stockQuantity: number;
  minOrderQuantity: number;
  description: string;
  applications: string[];
  hazardWarnings: string[];
  storageConditions?: string;
  featured?: boolean;
  density?: string;
  physicalState: string;
  origin?: string;
}

export interface CartItem {
  chemical: Chemical;
  quantity: number;
}

export type DeliveryType = 'ojota_pickup' | 'lagos_mainland' | 'lagos_island' | 'interstate_freight';

export type PaymentMethod = 'online_paystack' | 'onsite_depot' | 'pay_on_delivery';

export interface Order {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  companyName?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid (Online)' | 'Pending Depot Onsite Payment' | 'Pending POD';
  orderDate: string;
  pickupPassCode?: string;
  notes?: string;
}

export interface RfqRequest {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  chemicalsNeeded: string;
  estimatedQuantity: string;
  deliveryLocation: string;
  additionalDetails?: string;
}
