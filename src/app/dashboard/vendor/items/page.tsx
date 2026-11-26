'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { useAuth } from '../../../../context/AuthContext';
import { MenuItem } from '../../../../types';
import { Pizza, PlusCircle, Edit3, Trash2, Power, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function VendorMenuItemsPage() {
  const { user } = useAuth();
  const { items, updateMenuItem, deleteMenuItem } = usePizza();

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const vendorItems = items.filter((i) => i.vendorId === user?.id);

  const handleToggleAvailability = async (item: MenuItem) => {
    if (item.status === 'rejected') {
      Swal.fire({
        icon: 'error',
        title: 'Item Rejected',
        text: 'This item was rejected by an administrator and cannot be activated.',
      });
      return;
    }

    const nextStatus = item.status === 'approved' ? 'inactive' : 'approved';
    const res = await updateMenuItem(item._id, { status: nextStatus });
    if (res.success) {
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Item is now ${nextStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleDelete = async (itemId: string) => {
    const result = await Swal.fire({
      title: 'Delete Menu Item?',
      text: 'Are you sure you want to delete this pizza from your menu?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16A34A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Delete',
    });

    if (result.isConfirmed) {
      const res = await deleteMenuItem(itemId);
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Menu item deleted successfully',
          confirmButtonColor: '#16A34A',
        });
      }
    }
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setEditName(item.itemName);
    setEditPrice(item.price.toString());
    setEditDesc(item.description);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const res = await updateMenuItem(editingItem._id, {
      itemName: editName,
      price: parseFloat(editPrice),
      description: editDesc,
    });

    if (res.success) {
      setEditingItem(null);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Menu item details updated successfully',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <ProtectedRoute allowedRoles={['vendor']}>
      <DashboardLayout>
        <div className="space-y-6">
          
        
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">My Menu Items</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your pizzeria&apos;s published offerings, prices, and live status
              </p>
            </div>

            <Link
              href="/dashboard/vendor/add-item"
              className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 self-start"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Menu Item</span>
            </Link>
          </div>

       
          {vendorItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-emerald-100 p-12 text-center shadow-xs">
              <Pizza className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
              <h3 className="text-base font-black text-gray-900">No Items Created Yet</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Start adding your signature pizzas to welcome customer orders.
              </p>
              <Link
                href="/dashboard/vendor/add-item"
                className="px-5 py-2.5 bg-[#16A34A] text-white font-bold rounded-xl text-xs"
              >
                Create First Item
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-emerald-50/60 border-b border-emerald-100 text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-6 font-bold">Pizza Item</th>
                      <th className="py-3.5 px-4 font-bold">Category</th>
                      <th className="py-3.5 px-4 font-bold">Price</th>
                      <th className="py-3.5 px-4 font-bold">Location</th>
                      <th className="py-3.5 px-4 font-bold">Approval Status</th>
                      <th className="py-3.5 px-6 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vendorItems.map((item) => (
                      <tr key={item._id} className="hover:bg-emerald-50/30 transition-colors">
                        
                        
                        <td className="py-4 px-6 flex items-center gap-3">
                          <img
                            src={item.images[0]}
                            alt={item.itemName}
                            className="w-12 h-12 rounded-xl object-cover border border-emerald-100 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{item.itemName}</p>
                            {item.isFeatured && (
                              <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5">
                                <Sparkles className="w-2.5 h-2.5" /> Featured
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-medium text-gray-600">{item.category}</td>
                        
                        <td className="py-4 px-4 font-bold text-gray-900">${item.price.toFixed(2)}</td>

                        <td className="py-4 px-4 text-gray-600">{item.location}</td>

                       
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              item.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : item.status === 'inactive'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                       
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                    
                            {item.status !== 'rejected' && item.status !== 'pending' && (
                              <button
                                onClick={() => handleToggleAvailability(item)}
                                title={item.status === 'approved' ? 'Make Inactive' : 'Activate Item'}
                                className={`p-2 rounded-xl border transition-colors ${
                                  item.status === 'approved'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                <Power className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => openEditModal(item)}
                              title="Edit item"
                              className="p-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-[#16A34A] border border-gray-200 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                          
                            <button
                              onClick={() => handleDelete(item._id)}
                              title="Delete item"
                              className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
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
          )}

          {editingItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-100 relative">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-base font-black text-gray-900">Edit Menu Item</h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Price ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3.5 py-2 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full px-3.5 py-2 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
