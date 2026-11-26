'use client';

import React from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';
import { usePizza } from '../../../context/PizzaContext';
import { useAuth } from '../../../context/AuthContext';
import { ShoppingBag, Clock, CheckCircle2, XCircle, ArrowRight, Pizza } from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboardOverview() {
  const { user } = useAuth();
  const { orders } = usePizza();

  
  const customerOrders = orders.filter((o) => o.customerId === user?.id);

  const totalOrders = customerOrders.length;
  const pendingOrders = customerOrders.filter((o) => o.status === 'pending').length;
  const acceptedOrders = customerOrders.filter((o) => o.status === 'accepted').length;
  const rejectedOrders = customerOrders.filter((o) => o.status === 'rejected' || o.status === 'cancelled').length;

  const recentOrders = customerOrders.slice(0, 5);

  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <DashboardLayout>
        <div className="space-y-8">
          
        
          <div className="bg-gradient-to-r from-emerald-100/90 via-white to-emerald-50 p-6 sm:p-8 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Customer Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                Welcome back, {user?.name}! 🍕
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                Track your active pizza deliveries, review order history, and re-order your favorite pies.
              </p>
            </div>

            <Link
              href="/menu"
              className="px-5 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Pizza className="w-4 h-4" />
              <span>Explore New Pizzas</span>
            </Link>
          </div>

    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{totalOrders}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Pending Orders</p>
                <h3 className="text-2xl font-black text-amber-600 mt-1">{pendingOrders}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Accepted & Baking</p>
                <h3 className="text-2xl font-black text-emerald-600 mt-1">{acceptedOrders}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Cancelled / Rejected</p>
                <h3 className="text-2xl font-black text-red-600 mt-1">{rejectedOrders}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black text-gray-900">Recent Pizza Orders</h2>
                <p className="text-xs text-gray-500">Your latest requests and real-time status</p>
              </div>

              <Link
                href="/dashboard/customer/orders"
                className="text-xs font-bold text-[#16A34A] hover:underline flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <Pizza className="w-12 h-12 text-emerald-200 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-700">No pizza orders placed yet</p>
                <p className="text-xs text-gray-500 mt-1">Ready for a hot slice? Check out our browse menu!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider">
                      <th className="pb-3 font-bold">Pizza</th>
                      <th className="pb-3 font-bold">Restaurant</th>
                      <th className="pb-3 font-bold">Delivery Date</th>
                      <th className="pb-3 font-bold">Amount</th>
                      <th className="pb-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3 flex items-center gap-3">
                          <img
                            src={order.itemImage}
                            alt={order.itemName}
                            className="w-10 h-10 rounded-xl object-cover border border-emerald-100"
                          />
                          <span className="font-bold text-gray-900">{order.itemName}</span>
                        </td>
                        <td className="py-3 font-medium text-gray-600">{order.vendorName}</td>
                        <td className="py-3 text-gray-600">{order.deliveryDate}</td>
                        <td className="py-3 font-bold text-gray-900">${order.price.toFixed(2)}</td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              order.status === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
