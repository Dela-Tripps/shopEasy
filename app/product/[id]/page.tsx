// app/product/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-4xl font-bold mb-4">Product not found</h1>
        <Link href="/shop" className="text-cyan-400 underline">Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image */}
          <div className={`h-[500px] bg-gradient-to-br ${product.bg} rounded-3xl flex items-center justify-center`}>
            <span className="text-[150px] drop-shadow-2xl">{product.icon}</span>
          </div>

          {/* Right: Details */}
          <div>
            <h1 className="text-5xl font-black mb-6">{product.name}</h1>
            <p className="text-gray-400 text-xl mb-8 leading-relaxed">
              {product.desc} Engineered with futuristic materials, designed to push boundaries.
            </p>
            
            <div className="text-4xl font-black text-cyan-400 mb-10">
              {product.price}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)]"
              >
                Add to Cart
              </button>
              <Link 
                href="/cart" 
                className="px-10 py-4 bg-white/5 border border-white/20 hover:border-cyan-400 rounded-full font-bold text-lg transition-all duration-300 text-center"
              >
                Go to Cart
              </Link>
            </div>

            <Link href="/shop" className="inline-block mt-10 text-gray-500 hover:text-white transition-colors">
              ← Back to Shop
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}