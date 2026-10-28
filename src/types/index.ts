export type CoffeeCategory = 'pourover' | 'espresso' | 'coldbrew' | 'beans' | 'dessert';

export type RoastLevel = '淺焙' | '中淺焙' | '中焙' | '中深焙';

export interface BrewingRecipe {
  ratio: string;
  grindSize: string;
  waterTemp: string;
  time: string;
  recommendation: string;
}

export interface CoffeeItem {
  id: string;
  name: string;
  nameEn: string;
  category: CoffeeCategory;
  origin: string;
  altitude?: string;
  roastLevel: RoastLevel;
  process: string;
  flavorNotes: string[];
  acidity: number; // 1 to 5
  body: number; // 1 to 5
  sweetness: number; // 1 to 5
  price: number;
  pointsReward: number;
  description: string;
  tag?: string;
  brewingRecipe?: BrewingRecipe;
  visualTheme: {
    accentColor: string;
    bgGradient: string;
    iconType: 'pourover' | 'espresso' | 'coldbrew' | 'bean' | 'dessert';
  };
}

export interface CustomizationOption {
  temperature?: 'hot' | 'iced';
  milkType?: 'regular' | 'oat' | 'none';
  grindChoice?: 'whole' | 'filter' | 'espresso';
  iceLevel?: 'normal' | 'less' | 'none';
  sugarLevel?: 'none' | 'half' | 'regular';
  notes?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  coffee: CoffeeItem;
  quantity: number;
  customization: CustomizationOption;
  unitPrice: number;
  subtotal: number;
}

export type MembershipTier = 'BROWN' | 'SILVER' | 'GOLD' | 'AMBER_VIP';

export interface PointsLog {
  id: string;
  date: string;
  type: 'earn' | 'redeem' | 'bonus';
  points: number;
  title: string;
  balanceAfter: number;
}

export interface RedeemedVoucher {
  id: string;
  rewardId: string;
  title: string;
  code: string;
  pointsCost: number;
  redeemedAt: string;
  expireAt: string;
  status: 'valid' | 'used' | 'expired';
  category: string;
  discountValue?: number;
}

export interface OrderRecord {
  id: string;
  orderNo: string;
  createdAt: string;
  type: 'pickup' | 'dinein';
  items: {
    name: string;
    quantity: number;
    subtotal: number;
    customizationStr: string;
  }[];
  totalAmount: number;
  pointsEarned: number;
  pickupTimeOrSeat?: string;
  contactName: string;
  contactPhone: string;
  status: 'preparing' | 'ready' | 'completed';
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: MembershipTier;
  points: number;
  joinedDate: string;
  barcode: string;
  vouchers: RedeemedVoucher[];
  pointsHistory: PointsLog[];
  orders: OrderRecord[];
}

export interface RewardItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'voucher' | 'drink' | 'dripbag' | 'dessert' | 'beans' | 'gear';
  pointsCost: number;
  equivalentValue: number;
  stock: number;
  description: string;
  terms: string;
  featured?: boolean;
}

export interface ReservationForm {
  type: 'dinein' | 'pickup';
  date: string;
  timeSlot: string;
  partySize: number;
  seatingZone: 'bar' | 'sofa' | 'window' | 'quiet';
  contactName: string;
  contactPhone: string;
  notes: string;
}
