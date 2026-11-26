'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { useAuth } from '../../../../context/AuthContext';
import { Search, Ban, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminManageUsersPage() {
  const { user: currentAdmin } = useAuth();
  const { usersList, adminToggleUserBlock } = usePizza();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');


  const filteredUsers = usersList.filter((u) => {
    const matchSearch =
      search === '' ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.businessName && u.businessName.toLowerCase().includes(search.toLowerCase()));

    const matchRole = roleFilter === 'All' || u.role === roleFilter;

    return matchSearch && matchRole;
  });

  const handleToggleBlock = async (userId: string, isCurrentlyBlocked: boolean) => {
    if (userId === currentAdmin?.id) {
      Swal.fire({
        icon: 'error',
        title: 'Action Denied',
        text: 'You cannot block your own administrator account!',
        confirmButtonColor: '#16A34A',
      });
      return;
    }

    const nextState = !isCurrentlyBlocked;
    const actionText = nextState ? 'Block' : 'Unblock';

    const result = await Swal.fire({
      title: `${actionText} User?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} this user? ${
        nextState ? 'They will lose access to all protected platform features.' : 'Their access will be restored.'
      }`,
      icon: nextState ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: nextState ? '#DC2626' : '#16A34A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${actionText}`,
    });

    if (result.isConfirmed) {
      const res = await adminToggleUserBlock(userId, nextState);
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: `User ${actionText}ed`,
          text: res.message,
          timer: 1500,
          showConfirmButton: false,
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
              <h1 className="text-2xl font-black text-gray-900">Manage Users</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Review registered customer and vendor accounts, monitor roles, and manage account statuses
              </p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-2xs self-start">
              {filteredUsers.length} Users Listed
            </span>
          </div>

          
          <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user by name, email, or restaurant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-emerald-50/40 border border-emerald-200/70 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#16A34A]"
              />
            </div>

            <div className="w-full sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
              >
                <option value="All">All Roles</option>
                <option value="customer">Customer Only</option>
                <option value="vendor">Vendor Only</option>
                <option value="admin">Admin Only</option>
              </select>
            </div>
          </div>

        
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50/60 border-b border-emerald-100 text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6 font-bold">User</th>
                    <th className="py-3.5 px-4 font-bold">Role</th>
                    <th className="py-3.5 px-4 font-bold">Business Name</th>
                    <th className="py-3.5 px-4 font-bold">Subscription</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-6 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((u) => {
                    const isSelf = u.id === currentAdmin?.id;
                    return (
                      <tr key={u.id} className="hover:bg-emerald-50/30 transition-colors">
                        
              
                        <td className="py-3.5 px-6 flex items-center gap-3">
                          <img
                            src={u.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover border border-emerald-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{u.name}</p>
                            <p className="text-[11px] text-gray-500">{u.email}</p>
                          </div>
                        </td>

                  
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              u.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : u.role === 'vendor'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

              
                        <td className="py-3.5 px-4 text-gray-700 font-medium">
                          {u.businessName || '—'}
                        </td>

          
                        <td className="py-3.5 px-4">
                          {u.role === 'vendor' ? (
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                u.subscriptionPlan === 'premium'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {(u.subscriptionPlan || 'free').toUpperCase()}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

          
                        <td className="py-3.5 px-4">
                          {u.isBlocked ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                              Blocked
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              Active
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-6 text-right">
                          {isSelf ? (
                            <span className="text-[10px] text-gray-400 font-bold">You (Admin)</span>
                          ) : (
                            <button
                              onClick={() => handleToggleBlock(u.id, !!u.isBlocked)}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ml-auto ${
                                u.isBlocked
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                  : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                              }`}
                            >
                              {u.isBlocked ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Unblock</span>
                                </>
                              ) : (
                                <>
                                  <Ban className="w-3.5 h-3.5" />
                                  <span>Block</span>
                                </>
                              )}
                            </button>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
