'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, Order, Transaction, User } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_ORDERS, INITIAL_TRANSACTIONS, INITIAL_USERS } from '../data/initialData';
import { useAuth } from './AuthContext';

interface PizzaContextType {
  items: MenuItem[];
  orders: Order[];
  transactions: Transaction[];
  usersList: User[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredItems: MenuItem[];
  featuredItems: MenuItem[];
  getItemById: (id: string) => MenuItem | undefined;
  createMenuItem: (data: Omit<MenuItem, '_id' | 'createdAt'>) => Promise<{ success: boolean; message: string }>;
  updateMenuItem: (id: string, data: Partial<MenuItem>) => Promise<{ success: boolean; message: string }>;
  deleteMenuItem: (id: string) => Promise<{ success: boolean; message: string }>;
  placeOrder: (data: { itemId: string; deliveryDate: string; deliveryAddress: string; message?: string }) => Promise<{ success: boolean; message: string }>;
  cancelOrder: (orderId: string) => Promise<{ success: boolean; message: string }>;
  updateOrderStatus: (orderId: string, status: 'accepted' | 'rejected') => Promise<{ success: boolean; message: string }>;
  adminSetItemStatus: (itemId: string, status: 'approved' | 'rejected' | 'inactive') => Promise<{ success: boolean; message: string }>;
  adminToggleUserBlock: (userId: string, isBlocked: boolean) => Promise<{ success: boolean; message: string }>;
  upgradeToPremium: () => Promise<{ success: boolean; url?: string; message: string }>;
  uploadToImgBB: (file: File) => Promise<string>;
}

const PizzaContext = createContext<PizzaContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const PizzaProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, token, refreshUser } = useAuth();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest'); // 'newest', 'price_asc', 'price_desc'

  // Hydrate initial state
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try fetching public items from backend API
        let apiLoaded = false;
        try {
          const res = await fetch(`${API_BASE}/menu`);
          if (res.ok) {
            const data = await res.json();
            if (data.data && Array.isArray(data.data)) {
              setItems(data.data);
              apiLoaded = true;
            }
          }
        } catch {
          // Backend not reachable, fall back
        }

        if (!apiLoaded) {
          const savedItems = localStorage.getItem('pizzaarea_items') || localStorage.getItem('pizzahub_items');
          setItems(savedItems ? JSON.parse(savedItems) : INITIAL_MENU_ITEMS);
        }

        const savedOrders = localStorage.getItem('pizzaarea_orders') || localStorage.getItem('pizzahub_orders');
        setOrders(savedOrders ? JSON.parse(savedOrders) : INITIAL_ORDERS);

        const savedTx = localStorage.getItem('pizzaarea_transactions') || localStorage.getItem('pizzahub_transactions');
        setTransactions(savedTx ? JSON.parse(savedTx) : INITIAL_TRANSACTIONS);

        const savedUsers = localStorage.getItem('pizzaarea_all_users') || localStorage.getItem('pizzahub_all_users');
        setUsersList(savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS);
      } catch (e) {
        console.error('Failed to load initial pizza data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (items.length > 0) localStorage.setItem('pizzaarea_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (orders.length > 0) localStorage.setItem('pizzaarea_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (transactions.length > 0) localStorage.setItem('pizzaarea_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (usersList.length > 0) localStorage.setItem('pizzaarea_all_users', JSON.stringify(usersList));
  }, [usersList]);

  // Filtered Items (Approved and active only for public browse)
  const filteredItems = items
    .filter((item) => {
      const isApproved = item.status === 'approved';
      if (!isApproved) return false;

      // Search match
      const matchSearch =
        searchQuery === '' ||
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Category match
      const matchCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      // Location match
      const matchLocation =
        selectedLocation === 'All' ||
        item.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchSearch && matchCategory && matchLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0; // Default order
    });

  // Featured items (at least 6, approved, priority to isFeatured)
  const featuredItems = items
    .filter((item) => item.status === 'approved')
    .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    .slice(0, 6);

  const getItemById = (id: string) => {
    return items.find((item) => item._id === id);
  };

  // Vendor: Create Menu Item
  const createMenuItem = async (data: Omit<MenuItem, '_id' | 'createdAt'>) => {
    if (!user || user.role !== 'vendor') {
      return { success: false, message: 'Only vendors can create menu items' };
    }

    // Check free plan limit (max 3 items)
    if (user.subscriptionPlan !== 'premium') {
      const vendorActiveCount = items.filter(
        (i) => i.vendorId === user.id && (i.status === 'approved' || i.status === 'pending')
      ).length;

      if (vendorActiveCount >= 3) {
        return {
          success: false,
          message: 'Free plan limit reached (max 3 items). Upgrade to Premium for unlimited items!',
        };
      }
    }

    try {
      if (token && !token.startsWith('mock_')) {
        const res = await fetch(`${API_BASE}/vendor/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        if (res.ok && resData.success) {
          setItems((prev) => [resData.data, ...prev]);
          return { success: true, message: resData.message };
        }
      }

      // Local fallback
      const newItem: MenuItem = {
        ...data,
        _id: `item_${Date.now()}`,
        vendorId: user.id,
        vendorName: user.businessName || user.name,
        status: 'pending', // Pending until admin approval
        isFeatured: user.subscriptionPlan === 'premium',
        createdAt: new Date().toISOString(),
      };

      setItems((prev) => [newItem, ...prev]);
      return {
        success: true,
        message: 'Menu item created successfully and submitted for Admin review!',
      };
    } catch {
      return { success: false, message: 'Failed to create menu item' };
    }
  };

  // Vendor: Update Menu Item
  const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
    if (!user) return { success: false, message: 'Unauthorized' };

    try {
      if (token && !token.startsWith('mock_')) {
        const res = await fetch(`${API_BASE}/vendor/items/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        if (res.ok && resData.success) {
          setItems((prev) => prev.map((item) => (item._id === id ? resData.data : item)));
          return { success: true, message: resData.message };
        }
      }

      // Local update
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...data } : item))
      );
      return { success: true, message: 'Item updated successfully!' };
    } catch {
      return { success: false, message: 'Failed to update item' };
    }
  };

  // Vendor: Delete Menu Item
  const deleteMenuItem = async (id: string) => {
    if (!user) return { success: false, message: 'Unauthorized' };

    try {
      if (token && !token.startsWith('mock_')) {
        await fetch(`${API_BASE}/vendor/items/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setItems((prev) => prev.filter((item) => item._id !== id));
      return { success: true, message: 'Menu item deleted successfully' };
    } catch {
      return { success: false, message: 'Failed to delete menu item' };
    }
  };

  // Customer: Place Order
  const placeOrder = async (data: {
    itemId: string;
    deliveryDate: string;
    deliveryAddress: string;
    message?: string;
  }) => {
    if (!user || user.role !== 'customer') {
      return { success: false, message: 'Please sign in as a Customer to place an order.' };
    }

    const item = items.find((i) => i._id === data.itemId);
    if (!item) {
      return { success: false, message: 'Menu item not found.' };
    }

    // Rule: Only approved items can be ordered
    if (item.status !== 'approved') {
      return { success: false, message: 'This pizza is currently unavailable for order.' };
    }

    // Rule: Prevent duplicate active order for same item & delivery date
    const isDuplicate = orders.some(
      (o) =>
        o.customerId === user.id &&
        o.itemId === item._id &&
        o.deliveryDate === data.deliveryDate &&
        (o.status === 'pending' || o.status === 'accepted')
    );

    if (isDuplicate) {
      return {
        success: false,
        message: 'You already have an active order for this pizza on the selected date!',
      };
    }

    try {
      if (token && !token.startsWith('mock_')) {
        const res = await fetch(`${API_BASE}/customer/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        if (res.ok && resData.success) {
          setOrders((prev) => [resData.data, ...prev]);
          return { success: true, message: resData.message };
        } else if (!res.ok) {
          return { success: false, message: resData.message || 'Failed to place order' };
        }
      }

      // Local fallback
      const newOrder: Order = {
        _id: `order_${Date.now()}`,
        itemId: item._id,
        itemName: item.itemName,
        itemImage: item.images[0],
        price: item.price,
        vendorId: item.vendorId,
        vendorName: item.vendorName,
        customerId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        deliveryDate: data.deliveryDate,
        deliveryAddress: data.deliveryAddress,
        message: data.message || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      setOrders((prev) => [newOrder, ...prev]);
      return { success: true, message: 'Order submitted! The restaurant will review it shortly.' };
    } catch {
      return { success: false, message: 'Error processing order.' };
    }
  };

  // Customer: Cancel Order
  const cancelOrder = async (orderId: string) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    if (order.status !== 'pending') {
      return { success: false, message: `Cannot cancel order that is already ${order.status}` };
    }

    try {
      if (token && !token.startsWith('mock_')) {
        await fetch(`${API_BASE}/customer/orders/${orderId}/cancel`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: 'cancelled' } : o))
      );
      return { success: true, message: 'Your order was cancelled.' };
    } catch {
      return { success: false, message: 'Failed to cancel order.' };
    }
  };

  // Vendor: Accept / Reject Order
  const updateOrderStatus = async (orderId: string, status: 'accepted' | 'rejected') => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    if (order.status !== 'pending') {
      return { success: false, message: `Order is already ${order.status} and cannot be modified again.` };
    }

    try {
      if (token && !token.startsWith('mock_')) {
        await fetch(`${API_BASE}/vendor/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
      }

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
      return { success: true, message: `Order ${status} successfully!` };
    } catch {
      return { success: false, message: 'Failed to update order status' };
    }
  };

  // Admin: Approve, Reject, or deactivate item
  const adminSetItemStatus = async (itemId: string, status: 'approved' | 'rejected' | 'inactive') => {
    try {
      if (token && !token.startsWith('mock_')) {
        await fetch(`${API_BASE}/admin/items/${itemId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
      }

      setItems((prev) =>
        prev.map((item) => (item._id === itemId ? { ...item, status } : item))
      );
      return { success: true, message: `Menu item status updated to ${status}!` };
    } catch {
      return { success: false, message: 'Failed to update item status' };
    }
  };

  // Admin: Block / Unblock User
  const adminToggleUserBlock = async (userId: string, isBlocked: boolean) => {
    try {
      if (token && !token.startsWith('mock_')) {
        await fetch(`${API_BASE}/admin/users/${userId}/block`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isBlocked }),
        });
      }

      setUsersList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isBlocked } : u))
      );
      return {
        success: true,
        message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully!`,
      };
    } catch {
      return { success: false, message: 'Failed to update user block status' };
    }
  };

  // Vendor: Upgrade to Premium (Stripe)
  const upgradeToPremium = async () => {
    if (!user || user.role !== 'vendor') {
      return { success: false, message: 'Only vendors can subscribe to Premium' };
    }

    try {
      if (token && !token.startsWith('mock_')) {
        const res = await fetch(`${API_BASE}/payments/create-checkout-session`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.url) {
          window.location.href = data.url;
          return { success: true, url: data.url, message: 'Redirecting to Stripe...' };
        }
      }

      // Standalone simulation for local preview
      const simulatedTx: Transaction = {
        _id: `tx_${Date.now()}`,
        vendorId: user.id,
        vendorName: user.businessName || user.name,
        vendorEmail: user.email,
        plan: 'premium',
        amount: 19.99,
        currency: 'USD',
        stripeSessionId: `cs_test_mock_${Date.now()}`,
        status: 'succeeded',
        createdAt: new Date().toISOString(),
      };

      setTransactions((prev) => [simulatedTx, ...prev]);

      // Update user locally
      const updatedUser: User = {
        ...user,
        subscriptionPlan: 'premium',
      };
      localStorage.setItem('pizzaarea_user', JSON.stringify(updatedUser));
      refreshUser();

      return {
        success: true,
        url: '/payment-success?session_id=mock_session_success',
        message: 'Redirecting to payment confirmation...',
      };
    } catch {
      return { success: false, message: 'Failed to initialize Stripe checkout.' };
    }
  };

  // ImgBB Upload Helper
  const uploadToImgBB = async (file: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (apiKey && apiKey !== 'your_imgbb_api_key_here') {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        return data.data.url;
      }
    }

    // Beginner-friendly fallback: Read local file as Data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <PizzaContext.Provider
      value={{
        items,
        orders,
        transactions,
        usersList,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
        sortBy,
        setSortBy,
        filteredItems,
        featuredItems,
        getItemById,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
        placeOrder,
        cancelOrder,
        updateOrderStatus,
        adminSetItemStatus,
        adminToggleUserBlock,
        upgradeToPremium,
        uploadToImgBB,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizza = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizza must be used within a PizzaProvider');
  }
  return context;
};
