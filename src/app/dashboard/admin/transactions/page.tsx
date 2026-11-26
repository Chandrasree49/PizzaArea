'use client';

import React from 'react';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { CreditCard, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminTransactionsPage() {
  const { transactions } = usePizza();

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-6">
          
        
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Platform Transactions</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Stripe payment logs for vendor premium subscriptions (Immutable audit records)
              </p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-2xs self-start">
              {transactions.length} Total Records
            </span>
          </div>

      
          <div className="p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
            <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Audit Integrity:</strong> In accordance with financial regulations, payment transaction records are strictly read-only and cannot be manually edited or mutated by administrators.
            </span>
          </div>

    
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50/60 border-b border-emerald-100 text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6 font-bold">Transaction / Session ID</th>
                    <th className="py-3.5 px-4 font-bold">Vendor Info</th>
                    <th className="py-3.5 px-4 font-bold">Plan</th>
                    <th className="py-3.5 px-4 font-bold">Amount</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-6 font-bold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-emerald-50/30 transition-colors">
                      
                    
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <p className="font-mono font-bold text-gray-800 text-[11px] truncate max-w-xs">
                              {tx.stripeSessionId}
                            </p>
                            <p className="text-[10px] text-gray-400">ID: {tx._id}</p>
                          </div>
                        </div>
                      </td>

                  
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-900">{tx.vendorName}</p>
                        <p className="text-[11px] text-gray-500">{tx.vendorEmail}</p>
                      </td>

            
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                          {tx.plan}
                        </span>
                      </td>

                
                      <td className="py-4 px-4 font-black text-gray-900">
                        ${tx.amount.toFixed(2)} {tx.currency}
                      </td>

            
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          {tx.status}
                        </span>
                      </td>

              
                      <td className="py-4 px-6 text-right font-medium text-gray-500">
                        {new Date(tx.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
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
