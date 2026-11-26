'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { Search, Check, X, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminManageMenuItemsPage() {
  const { items, adminSetItemStatus, deleteMenuItem } = usePizza();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

 
  const filteredItems = items.filter((item) => {
    const matchSearch =
      search === '' ||
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (itemId: string, newStatus: 'approved' | 'rejected' | 'inactive') => {
    const res = await adminSetItemStatus(itemId, newStatus);
    if (res.success) {
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Menu item status changed to ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const result = await Swal.fire({
      title: 'Delete Inappropriate Item?',
      text: 'Are you sure you want to permanently remove this menu item as an administrator?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Delete Permanently',
    });

    if (result.isConfirmed) {
      const res = await deleteMenuItem(itemId);
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Item Deleted',
          text: 'The menu item was removed from the database.',
          confirmButtonColor: '#16A34A',
        });
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          
       
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Manage Menu Items</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Review vendor pizza submissions, approve or reject pending items, and maintain catalog quality
              </p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-2xs self-start">
              {filteredItems.length} Items Listed
            </span>
          </div>

         
          <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizzas by name, vendor, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-emerald-50/40 border border-emerald-200/70 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#16A34A]"
              />
            </div>

            <div className="w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

         
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50/60 border-b border-emerald-100 text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6 font-bold">Pizza Name</th>
                    <th className="py-3.5 px-4 font-bold">Vendor / Restaurant</th>
                    <th className="py-3.5 px-4 font-bold">Category</th>
                    <th className="py-3.5 px-4 font-bold">Price</th>
                    <th className="py-3.5 px-4 font-bold">Current Status</th>
                    <th className="py-3.5 px-6 font-bold text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.map((item) => (
                    <tr key={item._id} className="hover:bg-emerald-50/30 transition-colors">
                      
                      
                      <td className="py-3.5 px-6 flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt={item.itemName}
                          className="w-11 h-11 rounded-xl object-cover border border-emerald-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{item.itemName}</p>
                          <p className="text-[11px] text-gray-400">{item.location}</p>
                        </div>
                      </td>

                     
                      <td className="py-3.5 px-4 font-medium text-gray-700">
                        {item.vendorName}
                      </td>

                     
                      <td className="py-3.5 px-4 text-gray-600">
                        {item.category}
                      </td>

                     
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </td>

                  
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            item.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'pending'
                              ? 'bg-amber-100 text-amber-800 animate-pulse'
                              : item.status === 'inactive'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

               
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                     
                          {item.status !== 'approved' && (
                            <button
                              onClick={() => handleStatusChange(item._id, 'approved')}
                              title="Approve pizza"
                              className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-bold text-[11px] flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}

                         
                          {item.status !== 'rejected' && (
                            <button
                              onClick={() => handleStatusChange(item._id, 'rejected')}
                              title="Reject pizza"
                              className="px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl font-bold text-[11px] flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          )}

                       
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            title="Delete inappropriate item"
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-xl"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
