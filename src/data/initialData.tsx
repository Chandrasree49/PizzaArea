// pizzahub-client/src/data/initialData.ts
import { MenuItem, Order, Transaction, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_admin_1',
    name: 'Master Admin',
    email: 'admin@pizzahub.com',
    role: 'admin',
    isBlocked: false,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'user_vendor_1',
    name: 'Luigi Rossi',
    email: 'luigi@pizzahub.com',
    role: 'vendor',
    businessName: "Luigi's Authentic Wood-Fired Pizza",
    subscriptionPlan: 'premium',
    isBlocked: false,
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'user_customer_1',
    name: 'John Dough',
    email: 'customer@pizzahub.com',
    role: 'customer',
    isBlocked: false,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    _id: 'pizza_1',
    vendorId: 'user_vendor_1',
    vendorName: "Luigi's Authentic Wood-Fired Pizza",
    itemName: 'Margherita di Napoli',
    category: 'Classic Pizzas',
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, sweet basil leaves, and cold-pressed extra virgin olive oil on hand-stretched sourdough.',
    price: 14.99,
    location: 'Downtown Manhattan',
    images: [
      'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'pizza_2',
    vendorId: 'user_vendor_1',
    vendorName: "Luigi's Authentic Wood-Fired Pizza",
    itemName: 'Truffle & Wild Mushroom Gourmet',
    category: 'Specialty / Gourmet Pizzas',
    description: 'Roasted cremini, shiitake and oyster mushrooms with white truffle oil drizzle, creamy ricotta, and fresh thyme on a garlic-infused crust.',
    price: 21.50,
    location: 'Downtown Manhattan',
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'pizza_3',
    vendorId: 'user_vendor_1',
    vendorName: "Luigi's Authentic Wood-Fired Pizza",
    itemName: 'Pepperoni Inferno Supreme',
    category: 'Meat Lovers',
    description: 'Double artisanal beef pepperoni, spicy calabrese salami, red chili flakes, crushed garlic, and whole milk mozzarella cheese.',
    price: 17.99,
    location: 'Downtown Manhattan',
    images: [
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'pizza_4',
    vendorId: 'user_vendor_1',
    vendorName: "Luigi's Authentic Wood-Fired Pizza",
    itemName: 'Mediterranean Garden Delight',
    category: 'Vegetarian Pizzas',
    description: 'Sun-ripened cherry tomatoes, Kalamata olives, baby spinach, artichoke hearts, crumbled Greek feta, and herb olive oil.',
    price: 16.50,
    location: 'Brooklyn Heights',
    images: [
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'pizza_5',
    vendorId: 'user_vendor_1',
    vendorName: "Luigi's Authentic Wood-Fired Pizza",
    itemName: 'BBQ Smoked Chicken & Bacon',
    category: 'Meat Lovers',
    description: 'Tender hickory wood-smoked chicken breast, applewood smoked beef bacon, caramelized red onions, sweet smoky BBQ sauce drizzle.',
    price: 18.99,
    location: 'Brooklyn Heights',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'pizza_6',
    vendorId: 'user_vendor_1',
    vendorName: "Luigi's Authentic Wood-Fired Pizza",
    itemName: 'Cheesy Garlic Herb Breadsticks',
    category: 'Sides & Appetizers',
    description: 'Crispy golden baked breadsticks filled with melted cheddar and mozzarella, brushed with garlic herb butter and served with marinara dip.',
    price: 8.99,
    location: 'Brooklyn Heights',
    images: [
      'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'approved',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_ORDERS: Order[] = [];
export const INITIAL_TRANSACTIONS: Transaction[] = [];

export const PIZZA_CATEGORIES: string[] = [
  'All',
  'Classic Pizzas',
  'Vegetarian Pizzas',
  'Meat Lovers',
  'Specialty / Gourmet Pizzas',
  'Sides & Appetizers',
  'Beverages & Desserts',
];

export const POPULAR_LOCATIONS: string[] = [
  'All',
  'Downtown Manhattan',
  'Brooklyn Heights',
  'Queens Central',
  'Staten Island',
  'SoHo',
];