export type Role = 'customer' | 'vendor' | 'admin';
export type SubscriptionPlan = 'free' | 'premium';
export type ItemStatus = 'pending' | 'approved' | 'rejected' | 'inactive';
export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isBlocked?: boolean;
  businessName?: string;
  subscriptionPlan?: SubscriptionPlan;
  image?: string;
}

export interface MenuItem {
  _id: string;
  vendorId: string;
  vendorName: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: ItemStatus;
  isFeatured?: boolean;
  createdAt?: string;
  vendor?: {
    id: string;
    name: string;
    businessName: string;
    email: string;
    image?: string;
    isPremium?: boolean;
  };
}

export interface Order {
  _id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  price: number;
  vendorId: string;
  vendorName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  deliveryDate: string;
  deliveryAddress: string;
  message?: string;
  status: OrderStatus;
  createdAt: string;
}

export interface Transaction {
  _id: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: string;
  createdAt: string;
}
 