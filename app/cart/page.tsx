// app/cart/page.tsx
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // Converting "$189" to 189 for total calculation
  const total = cart.reduce((sum, item) => {
    const priceNum = Number(item.price.replace("$", ""));
    return sum + priceNum;
  }, 0);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-10">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl mb-6">Your cart is currently empty.</p>
              <Link href="/shop" className="px-8 py-4 bg-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-500 transition-colors inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center text-3xl`}>
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{item.name}</h2>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-cyan-400 mb-2">{item.price}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 text-sm hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Total</h3>
                  <p className="text-3xl font-black text-cyan-400">${total}</p>
                </div>
                <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full font-bold text-lg transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}