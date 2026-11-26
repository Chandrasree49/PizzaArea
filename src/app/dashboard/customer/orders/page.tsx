'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { useAuth } from '../../../../context/AuthContext';
import { Order } from '../../../../types';
import { Calendar, MapPin, Store, X, Pizza } from 'lucide-react';
import Swal from 'sweetalert2';

export default function CustomerOrdersPage() {
  const { user } = useAuth();
  const { orders, cancelOrder } = usePizza();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders for this customer
  const customerOrders = orders.filter((o) => o.customerId === user?.id);

  const handleCancel = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'Cancel Pizza Order?',
      text: 'Are you sure you want to cancel this order? This action cannot be reversed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16A34A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Cancel Order',
    });

    if (result.isConfirmed) {
      const res = await cancelOrder(orderId);
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Order Cancelled',
          text: res.message,
          confirmButtonColor: '#16A34A',
        });
        if (selectedOrder?._id === orderId) {
          setSelectedOrder(null);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Cannot Cancel',
          text: res.message,
          confirmButtonColor: '#16A34A',
        });
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <DashboardLayout>
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">My Pizza Orders</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your scheduled deliveries and cancel pending orders
              </p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-2xs self-start">
              {customerOrders.length} Total Orders
            </span>
          </div>

          {/* Orders List / Cards */}
          {customerOrders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-emerald-100 p-12 text-center shadow-xs">
              <Pizza className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
              <h3 className="text-base font-black text-gray-900">No Orders Placed Yet</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Explore our curated local menus and place your first order today.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {customerOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-emerald-100 shadow-xs p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Pizza & Vendor info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={order.itemImage}
                      alt={order.itemName}
                      className="w-16 h-16 rounded-2xl object-cover border border-emerald-100 shrink-0"
                    />
                    <div>
                      <h3 className="text-base font-black text-gray-900">{order.itemName}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1 font-medium text-emerald-800">
                          <Store className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{order.vendorName}</span>
                        </span>
                        <span>•</span>
                        <span className="font-bold text-gray-900">${order.price.toFixed(2)}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        Delivery: <strong className="text-gray-700">{order.deliveryDate}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Middle / Right: Status and Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        order.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-emerald-50 hover:text-[#16A34A] rounded-xl border border-gray-200 transition-colors"
                      >
                        View Details
                      </button>

                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="px-3.5 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-100 relative">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-lg font-black text-gray-900">Order Information</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <img
                      src={selectedOrder.itemImage}
                      alt={selectedOrder.itemName}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-black text-gray-900">{selectedOrder.itemName}</h4>
                      <p className="text-gray-500">{selectedOrder.vendorName}</p>
                      <p className="font-bold text-[#16A34A] mt-0.5">${selectedOrder.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 uppercase font-bold text-[10px]">Order ID</span>
                    <p className="font-mono text-gray-700">{selectedOrder._id}</p>
                  </div>

                  <div>
                    <span className="text-gray-400 uppercase font-bold text-[10px]">Delivery Date</span>
                    <p className="font-semibold text-gray-800 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {selectedOrder.deliveryDate}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-400 uppercase font-bold text-[10px]">Delivery Address</span>
                    <p className="font-semibold text-gray-800 flex items-start gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      {selectedOrder.deliveryAddress}
                    </p>
                  </div>

                  {selectedOrder.message && (
                    <div>
                      <span className="text-gray-400 uppercase font-bold text-[10px]">Special Instructions</span>
                      <p className="p-2.5 bg-gray-50 rounded-xl text-gray-700 mt-0.5 border border-gray-100 italic">
                        &quot;{selectedOrder.message}&quot;
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="text-gray-400 uppercase font-bold text-[10px]">Current Status</span>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          selectedOrder.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : selectedOrder.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(selectedOrder._id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
