'use client';

import React from 'react';
import { usePizza } from '../../context/PizzaContext';
import { useAuth } from '../../context/AuthContext';
import PizzaCard from '../../components/PizzaCard';
import { PIZZA_CATEGORIES, POPULAR_LOCATIONS } from '../../data/initialData';
import { Search, Filter, ArrowUpDown, RotateCcw, Pizza, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function BrowseMenuPage() {
  const {
    filteredItems,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    sortBy,
    setSortBy,
  } = usePizza();

  const { user } = useAuth();

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner (Green Theme) */}
      <div className="bg-gradient-to-r from-emerald-100/90 via-white to-emerald-50 p-8 sm:p-10 rounded-3xl border border-emerald-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Freshly Baked Green Kitchen
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-2">
            Browse All Pizzas & Sides
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-xl">
            Explore authentic stone-baked pizzas, vegetarian pies, gourmet creations, and savory appetizers from certified local pizzerias.
          </p>
        </div>

        {!user && (
          <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs text-xs text-gray-700 max-w-xs shrink-0">
            <p className="font-bold text-gray-900 mb-1">Looking to Order?</p>
            <p className="text-gray-500 mb-3">Sign in to your customer account to place orders with delivery instructions.</p>
            <Link
              href="/signin"
              className="inline-block w-full py-2 px-3 text-center bg-[#16A34A] text-white font-bold rounded-xl hover:bg-[#15803D] transition-colors"
            >
              Sign In to Order
            </Link>
          </div>
        )}
      </div>

      {/* Search, Filter & Sort Controls Bar */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
        
        {/* Search Input Row */}
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pizzas by name, crust, ingredients (e.g. Truffle, Pepperoni, Margherita)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-emerald-50/40 border border-emerald-200/70 rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#16A34A] focus:ring-2 focus:ring-emerald-100 transition-all"
          />
        </div>

        {/* Filters and Sorting Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            >
              {PIZZA_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Location / Area
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            >
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By (Challenge Requirement) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600" />
              Sort By Price
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            >
              <option value="newest">Featured & Newest</option>
              <option value="price_asc">Price: Low to High ($ → $$$)</option>
              <option value="price_desc">Price: High to Low ($$$ → $)</option>
            </select>
          </div>

        </div>

        {/* Active Filters Bar and Clear Button */}
        {(searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All' || sortBy !== 'newest') && (
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              Showing {filteredItems.length} filtered results
            </span>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] hover:text-[#15803D] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-[#16A34A] animate-spin mb-4" />
          <p className="text-sm font-bold text-gray-600">Gathering fresh pizzas from local ovens...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-emerald-100 p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto mb-4">
            <Pizza className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">No Pizzas Match Your Search</h3>
          <p className="text-xs text-gray-600 mb-6">
            We couldn&apos;t find any approved pizzas matching your selected category, location, or search keyword. Try clearing some filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#16A34A] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#15803D] transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      ) : (
        /* Grid of Approved Pizzas */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <PizzaCard key={item._id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
}
