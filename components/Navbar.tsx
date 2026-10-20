"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { cart } = useCart();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

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

      <div className="flex items-center gap-4">
        {/* ✅ Auth link */}
        {status === 'loading' ? (
          <div className="w-20 h-8 bg-white/5 rounded-full animate-pulse" />
        ) : session ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-cyan-400 rounded-full text-sm hover:text-cyan-400 transition-all"
            >
              <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs font-bold">
                {session.user?.email?.[0].toUpperCase()}
              </span>
              <span className="hidden sm:inline">Account</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                <Link
                  href="/admin"
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 border border-white/20 hover:border-cyan-400 rounded-full text-sm hover:text-cyan-400 transition-all"
          >
            Login
          </Link>
        )}

        {/* Cart */}
        <Link href="/cart" className="px-4 py-2 border border-white/20 hover:border-cyan-400 rounded-full text-sm hover:text-cyan-400 transition-all">
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}