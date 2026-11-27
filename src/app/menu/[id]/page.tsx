'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePizza } from '../../../context/PizzaContext';
import { useAuth } from '../../../context/AuthContext';
import { MenuItem } from '../../../types';
import {
  Pizza,
  MapPin,
  Store,
  Sparkles,
  Calendar,
  Truck,
  MessageSquare,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

function ItemDetailsContent() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { getItemById, placeOrder, items } = usePizza();
  const { user, isLoading: authLoading, isCustomer, isAdmin } = useAuth();

  const [item, setItem] = useState<MenuItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [message, setMessage] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);


  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/signin?redirect=/menu/${id}`);
    }
  }, [user, authLoading, id, router]);

  useEffect(() => {
    if (id) {
      const found = getItemById(id);
      if (found) {
        setItem(found);
      }
    }
  }, [id, items, getItemById]);

  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-[#16A34A] animate-spin mb-4" />
        <p className="text-sm font-bold text-gray-700">Checking credentials...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="p-4 bg-red-100 rounded-full text-red-600 inline-block mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Pizza Not Found</h2>
        <p className="text-sm text-gray-600 mb-6">
          The requested menu item does not exist or may have been removed.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#16A34A] text-white font-bold rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Browse Menu</span>
        </Link>
      </div>
    );
  }

 
  const isApproved = item.status === 'approved';
  const isOwnItem = user && user.id === item.vendorId;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryDate || !deliveryAddress) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please select a Delivery Date and provide your full Delivery Address.',
      });
      return;
    }

    setIsSubmitting(true);
    const res = await placeOrder({
      itemId: item._id,
      deliveryDate,
      deliveryAddress,
      message,
    });
    setIsSubmitting(false);

    if (res.success) {
      setShowOrderModal(false);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: 'Your order was sent to the pizzeria. You can track its status in your Customer Dashboard.',
        confirmButtonColor: '#16A34A',
      });
      router.push('/dashboard/customer/orders');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: res.message,
        confirmButtonColor: '#16A34A',
      });
    }
  };

  const imagesList = item.images && item.images.length > 0 ? item.images : ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
     
      <div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#16A34A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Menu</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-emerald-100 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
        
  
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-emerald-50/50 border border-emerald-100 shadow-xs">
            <img
              src={imagesList[activeImageIndex]}
              alt={item.itemName}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {item.isFeatured && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Featured Special
              </span>
            )}
          </div>

      
          {imagesList.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#16A34A] scale-105 shadow-md'
                      : 'border-emerald-200/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
    
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
                {item.category}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  item.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.status.toUpperCase()}
              </span>
            </div>

         
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
              {item.itemName}
            </h1>

         
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-[#16A34A]">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                (Standard 12&quot; Hand-Tossed Pie)
              </span>
            </div>

      
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Flavor & Ingredients
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>

         
            <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Crafted By</p>
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {item.vendorName || 'Artisan Pizzeria'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Neighborhood</p>
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="pt-4 border-t border-gray-100">
            {!isApproved ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>This pizza is currently pending approval or inactive and cannot be ordered yet.</span>
              </div>
            ) : isAdmin ? (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-600">
                Admins have managerial oversight and cannot place customer orders.
              </div>
            ) : isOwnItem ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800">
                You are the restaurant owner of this item and cannot order your own menu item.
              </div>
            ) : isCustomer ? (
              <button
                onClick={() => setShowOrderModal(true)}
                className="w-full py-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-600/20 hover:shadow-2xl transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-3"
              >
                <Pizza className="w-5 h-5" />
                <span>Order Pizza Now (${item.price.toFixed(2)})</span>
              </button>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
                Please sign in with a Customer account to place orders.
              </div>
            )}
          </div>

        </div>

      </div>

    
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-black text-gray-900">Place Pizza Order</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Ordering: <strong className="text-gray-800">{item.itemName}</strong> (${item.price.toFixed(2)})
                </p>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Delivery Date *
                </label>
                <input
                  type="date"
                  min={today}
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                />
              </div>

             
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Apartment, Street address, City, ZIP..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                />
              </div>

             
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  Special Instructions / Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Extra crispy crust, please leave with doorman, extra fresh basil..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                />
              </div>

             
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-900">
                ℹ️ <strong>Cash / Terminal on Delivery:</strong> Payment is collected directly by the pizzeria delivery partner upon handover.
              </div>

         
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-black rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Pizza Order'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ItemDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-[#16A34A] animate-spin mb-4" />
          <p className="text-sm font-bold text-gray-700">Loading pizza details...</p>
        </div>
      }
    >
      <ItemDetailsContent />
    </Suspense>
  );
}
