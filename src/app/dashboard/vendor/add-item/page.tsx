'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { useAuth } from '../../../../context/AuthContext';
import { PIZZA_CATEGORIES, POPULAR_LOCATIONS } from '../../../../data/initialData';
import { Pizza, Upload, DollarSign, MapPin, Tag, FileText, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AddMenuItemPage() {
  const router = useRouter();
  const { user, isPremium } = useAuth();
  const { createMenuItem, uploadToImgBB, items } = usePizza();

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState(PIZZA_CATEGORIES[1] || 'Classic Pizzas');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(POPULAR_LOCATIONS[1] || 'Downtown Manhattan');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const vendorItemCount = items.filter(
    (i) => i.vendorId === user?.id && (i.status === 'approved' || i.status === 'pending')
  ).length;

  const isFreeLimitReached = !isPremium && vendorItemCount >= 3;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFreeLimitReached) {
      Swal.fire({
        icon: 'warning',
        title: 'Free Plan Limit Reached',
        text: 'You have reached the maximum of 3 items allowed on the Free plan. Please upgrade to Premium for unlimited items.',
        confirmButtonColor: '#16A34A',
        showCancelButton: true,
        confirmButtonText: 'Upgrade to Premium',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/dashboard/vendor/subscription');
        }
      });
      return;
    }

    if (!itemName || !description || !price || !location) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please complete all required fields.',
      });
      return;
    }

    setIsSubmitting(true);

    let finalImageUrl =
      previewUrl ||
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80';

    if (imageFile) {
      try {
        finalImageUrl = await uploadToImgBB(imageFile);
      } catch (err) {
        console.error('ImgBB upload error:', err);
      }
    }

    const res = await createMenuItem({
      vendorId: user?.id || '',
      vendorName: user?.businessName || user?.name || 'Artisan Pizzeria',
      itemName: itemName.trim(),
      category,
      description: description.trim(),
      price: parseFloat(price),
      location,
      images: [finalImageUrl],
      status: 'pending', 
      isFeatured: isPremium,
    });

    setIsSubmitting(false);

    if (res.success) {
      Swal.fire({
        icon: 'success',
        title: 'Pizza Submitted!',
        text: res.message,
        confirmButtonColor: '#16A34A',
      });
      router.push('/dashboard/vendor/items');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: res.message,
        confirmButtonColor: '#16A34A',
      });
    }
  };

  return (
    <ProtectedRoute allowedRoles={['vendor']}>
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          
       
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Add New Menu Item</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Submit a new pizza, side, or dessert to your pizzeria catalog
              </p>
            </div>

            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-100 bg-white shadow-2xs">
              {isPremium ? (
                <span className="text-amber-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Unlimited Items (Pro)
                </span>
              ) : (
                <span className="text-gray-600">
                  Free Tier: <strong>{vendorItemCount}/3</strong> Active Items
                </span>
              )}
            </div>
          </div>

        
          {isFreeLimitReached && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
              <span>
                You have reached the maximum of 3 items on the Free plan. Upgrade to publish unlimited menu items.
              </span>
              <button
                onClick={() => router.push('/dashboard/vendor/subscription')}
                className="px-3 py-1.5 bg-amber-600 text-white font-bold rounded-xl shrink-0 ml-3"
              >
                Upgrade Now
              </button>
            </div>
          )}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
            
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Pizza className="w-3.5 h-3.5 text-emerald-600" />
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quattro Formaggi (Four Cheeses)"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                />
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                  >
                    {PIZZA_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="18.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                  />
                </div>
              </div>

             
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Restaurant Area / City *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                >
                  {POPULAR_LOCATIONS.filter((l) => l !== 'All').map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

             
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  Description & Ingredients *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="San Marzano tomato sauce, fresh Fior di Latte mozzarella, basil leaves..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
                />
              </div>

           
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  Item Image (ImgBB File Upload) *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-[#16A34A] hover:file:bg-emerald-200 cursor-pointer"
                />

                {previewUrl && (
                  <div className="mt-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Image Preview</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-36 h-28 object-cover rounded-xl border border-emerald-200 shadow-2xs"
                    />
                  </div>
                )}
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 text-[11px] text-gray-600">
                ℹ️ <strong>Review Notice:</strong> Newly submitted items will be saved with status <strong>Pending</strong> until approved by a PizzaArea Administrator.
              </div>

         
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/vendor/items')}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isFreeLimitReached}
                  className="px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-black rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Menu Item'}
                </button>
              </div>

            </form>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
