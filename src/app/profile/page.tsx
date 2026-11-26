'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { usePizza } from '../../context/PizzaContext';
import { User, Mail, Store, Sparkles, Upload, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function ProfileSettingsPage() {
  const { user, updateProfile, isVendor, isPremium, isAdmin } = useAuth();
  const { uploadToImgBB } = usePizza();

  const [name, setName] = useState(user?.name || '');
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user?.image || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Name Required',
        text: 'Please enter your full name.',
      });
      return;
    }

    setIsSubmitting(true);
    let finalImage = previewUrl;

    if (imageFile) {
      try {
        finalImage = await uploadToImgBB(imageFile);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }

    const res = await updateProfile({
      name: name.trim(),
      businessName: isVendor ? businessName.trim() : undefined,
      image: finalImage,
    });

    setIsSubmitting(false);

    if (res.success) {
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
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
  };

  const getDashboardLink = () => {
    if (isAdmin) return '/dashboard/admin';
    if (isVendor) return '/dashboard/vendor';
    return '/dashboard/customer';
  };

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        
        {/* Navigation */}
        <Link
          href={getDashboardLink()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#16A34A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={previewUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name || 'User'}
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-200 shadow-md"
            />
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-gray-900">{user?.name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {user?.role}
              </span>
              {isPremium && (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 text-amber-600" /> PRO
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{user?.email}</p>
            {user?.businessName && (
              <p className="text-xs font-medium text-emerald-700">{user.businessName}</p>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-xs">
          <h2 className="text-lg font-black text-gray-900 mb-1">Edit Profile Details</h2>
          <p className="text-xs text-gray-500 mb-6">
            Update your public display name and avatar photo
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
              />
            </div>

            {/* Email (Read-Only) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                Email Address (Permanent Account ID)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Business Name (Vendor only) */}
            {isVendor && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-emerald-600" />
                  Pizzeria Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                />
              </div>
            )}

            {/* Profile Avatar Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                Change Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-[#16A34A] hover:file:bg-emerald-200 cursor-pointer"
              />
            </div>

            {/* Security Notice */}
            <div className="p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 border border-gray-100">
              🔒 <strong>Security Notice:</strong> Your account role (<code>{user?.role}</code>) and subscription status are managed securely and cannot be modified through profile updates.
            </div>

            {/* Save Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </ProtectedRoute>
  );
}
