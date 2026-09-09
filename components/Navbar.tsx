// components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        <Link href="/" className="text-2xl font-extrabold tracking-tighter">
          Shop<span className="text-cyan-400">Easy</span>
        </Link>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>

      <Link href="/cart" className="px-4 py-2 border border-white/20 hover:border-cyan-400 rounded-full text-sm hover:text-cyan-400 transition-all">
        Cart ({cart.length})
      </Link>
    </nav>
  );
}