'use client';

import React from 'react';
import Link from 'next/link';
import { usePizza } from '../context/PizzaContext';
import PizzaCard from '../components/PizzaCard';
import {
  Pizza,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ChefHat,
  Truck,
  HeartHandshake,
  Leaf,
  Store,
  Star,
  Flame,
} from 'lucide-react';

export default function HomePage() {
  const { featuredItems, setSelectedCategory } = usePizza();

  const categories = [
    {
      name: 'Classic Pizzas',
      count: 'Napoli, Margherita & Formaggi',
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
      tag: 'Timeless',
    },
    {
      name: 'Vegetarian Pizzas',
      count: 'Fresh Garden, Greek Feta & Greens',
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
      tag: '100% Plant-Based',
    },
    {
      name: 'Meat Lovers',
      count: 'Artisanal Beef Pepperoni & BBQ Chicken',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
      tag: 'Crispy & Savory',
    },
    {
      name: 'Specialty / Gourmet Pizzas',
      count: 'White Truffle & Wild Shiitake Mushrooms',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      tag: "Master Chef's Special",
    },
    {
      name: 'Sides & Appetizers',
      count: 'Garlic Herb Breadsticks & Marinara',
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
      tag: 'Crunchy Bites',
    },
    {
      name: 'Beverages & Desserts',
      count: 'Authentic Tiramisu & Italian Sodas',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      tag: 'Sweet Treats',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[680px] flex items-center justify-center bg-stone-950 border-b border-emerald-900/30">
        
      
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-stone-950/75 to-black/90 backdrop-blur-[1px]" />
        
       
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20 sm:py-28 lg:py-32 flex flex-col items-center justify-center">
          
         
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider backdrop-blur-md mb-6 shadow-lg shadow-black/20">
            <Leaf className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Farm-to-Table Artisan Wood-Fired Pizzeria</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] mb-6 drop-shadow-md">
            Hot & Fresh Pizza <br />
            <span className="text-[#22C55E] bg-gradient-to-r from-emerald-400 via-green-400 to-teal-300 bg-clip-text text-transparent">
              Delivered to Your Door
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-normal mb-8 text-center drop-shadow-sm">
            Discover artisan local pizzerias, browse mouthwatering stone-baked slices, and order hand-tossed Italian crusts made from authentic San Marzano tomatoes, organic basil, and whole milk mozzarella.
          </p>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-900/50 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
            >
              <Pizza className="w-5 h-5" />
              <span>Explore Pizza Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/signup?role=vendor"
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/25 backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Register as Restaurant</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto w-full pt-8 border-t border-white/15">
            <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-md">
              <h4 className="text-xl sm:text-3xl font-black text-white">30m</h4>
              <p className="text-[11px] sm:text-xs text-gray-300 font-medium mt-0.5">Average Delivery</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-md">
              <h4 className="text-xl sm:text-3xl font-black text-white">100%</h4>
              <p className="text-[11px] sm:text-xs text-gray-300 font-medium mt-0.5">Organic Ingredients</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-md">
              <h4 className="text-xl sm:text-3xl font-black text-white flex items-center justify-center gap-1">
                4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-300 font-medium mt-0.5">Customer Rating</p>
            </div>
          </div>

        </div>
      </section>

     
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#16A34A] font-black text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Chef&apos;s Signature Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Featured Menu Items
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              Freshly approved signature pies handcrafted by master pizzaiolos in your neighborhood.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#16A34A] hover:text-[#15803D] transition-colors"
          >
            <span>View All Menu Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <PizzaCard key={item._id} item={item} />
          ))}
        </div>
      </section>

   
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#16A34A] font-black text-xs uppercase tracking-wider">
            Curated Flavors
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
            Explore by Pizza Categories
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Whether you love crispy thin crusts, decadent double cheeses, or savory vegetarian toppings, we have it all.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/menu?category=${encodeURIComponent(cat.name)}`}
              onClick={() => setSelectedCategory(cat.name)}
              className="group relative h-48 rounded-3xl overflow-hidden border border-emerald-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/40 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600/90 mb-1.5">
                  {cat.tag}
                </span>
                <h3 className="text-xl font-black tracking-tight group-hover:text-emerald-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 font-medium mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#F7FBF8] via-emerald-50/50 to-[#F7FBF8] py-16 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#16A34A] font-black text-xs uppercase tracking-wider">
              Quality Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
              Why Choose PizzaHub?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              We connect hungry pizza lovers directly with authentic local pizzerias that care about culinary craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">30-Min Fast Delivery</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Thermal-sealed insulated delivery bags ensure your cheese arrives gooey and bubbling hot.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Artisan Handcrafted</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hand-kneaded sourdough fermented for 48 hours to create airy, digestible crusts baked at 800°F.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">100% Fresh Ingredients</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Real buffalo mozzarella, cold-pressed olive oils, and genuine San Marzano plum tomatoes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Support Local Chefs</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every order directly supports family-owned local pizzerias in your surrounding neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#16A34A] font-black text-xs uppercase tracking-wider">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
            How PizzaHub Works
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            From craving to doorstep satisfaction in four seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="relative p-6 bg-white rounded-3xl border border-emerald-100 shadow-xs text-center flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center mb-3">
              1
            </span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Pizza className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-gray-900 mb-1">Select Your Pie</h4>
            <p className="text-xs text-gray-600">
              Explore menus by category, price, or location from certified pizzerias.
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-3xl border border-emerald-100 shadow-xs text-center flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center mb-3">
              2
            </span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-gray-900 mb-1">Set Delivery & Notes</h4>
            <p className="text-xs text-gray-600">
              Provide your delivery date, address, and special crust instructions.
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-3xl border border-emerald-100 shadow-xs text-center flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center mb-3">
              3
            </span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Flame className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-gray-900 mb-1">Freshly Baked</h4>
            <p className="text-xs text-gray-600">
              Your vendor accepts the request and bakes your order in a stone oven.
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-3xl border border-emerald-100 shadow-xs text-center flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center mb-3">
              4
            </span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-gray-900 mb-1">Express Delivery</h4>
            <p className="text-xs text-gray-600">
              Delivered piping hot right to your door ready for you to savor!
            </p>
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Hungry Right Now?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Order Your Favorite Pizza in 60 Seconds
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed font-normal">
              Join thousands of happy foodies who order everyday from PizzaHub. Fresh ingredients, direct delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/menu"
              className="px-8 py-4 bg-white text-[#15803D] hover:bg-emerald-50 font-black text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-center"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}