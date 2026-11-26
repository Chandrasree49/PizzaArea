'use client';

import React from 'react';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { useAuth } from '../../../../context/AuthContext';
import { Calendar, MapPin, User, MessageSquare, Check, X, Pizza } from 'lucide-react';
import Swal from 'sweetalert2';

export default function VendorOrdersPage() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = usePizza();

  
  const vendorOrders = orders.filter((o) => o.vendorId === user?.id);

  const handleStatusUpdate = async (orderId: string, status: 'accepted' | 'rejected') => {
    const actionText = status === 'accepted' ? 'Accept & Bake' : 'Reject';
    const confirmColor = status === 'accepted' ? '#16A34A' : '#DC2626';

    const result = await Swal.fire({
      title: `${actionText} Order?`,
      text: `Are you sure you want to mark this order as ${status}? You can only set this once.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${actionText}`,
    });

    if (result.isConfirmed) {
      const res = await updateOrderStatus(orderId, status);
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: `Order ${status}!`,
          text: res.message,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: res.message,
          confirmButtonColor: '#16A34A',
        });
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['vendor']}>
      <DashboardLayout>
        <div className="space-y-6">
          
        
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Incoming Customer Orders</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Review scheduled delivery requests and accept or reject pending orders
              </p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-2xs self-start">
              {vendorOrders.length} Total Orders
            </span>
          </div>

        
          {vendorOrders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-emerald-100 p-12 text-center shadow-xs">
              <Pizza className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
              <h3 className="text-base font-black text-gray-900">No Orders in Queue</h3>
              <p className="text-xs text-gray-500 mt-1">
                When customers place pizza orders for your restaurant, they will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {vendorOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl border border-emerald-100 shadow-xs p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    
                    <div className="flex items-start gap-4">
                      <img
                        src={order.itemImage}
                        alt={order.itemName}
                        className="w-16 h-16 rounded-2xl object-cover border border-emerald-100 shrink-0 mt-1"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-gray-900">{order.itemName}</h3>
                          <span className="text-xs font-black text-[#16A34A]">
                            ${order.price.toFixed(2)}
                          </span>
                        </div>

                    
                        <p className="text-xs text-gray-600 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Customer: <strong className="text-gray-800">{order.customerName}</strong> ({order.customerEmail})</span>
                        </p>

                      
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            Date: <strong className="text-gray-700">{order.deliveryDate}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="text-gray-700">{order.deliveryAddress}</span>
                          </span>
                        </div>

                    
                        {order.message && (
                          <p className="text-xs text-gray-600 italic bg-emerald-50/70 p-2.5 rounded-xl mt-2 flex items-start gap-1.5 border border-emerald-100">
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>&quot;{order.message}&quot;</span>
                          </p>
                        )}
                      </div>
                    </div>

                    
                    <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          order.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        Status: {order.status}
                      </span>

                      
                      {order.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStatusUpdate(order._id, 'accepted')}
                            className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept Order</span>
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(order._id, 'rejected')}
                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-400 font-medium">
                          Decision recorded
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
