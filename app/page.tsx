import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { products as staticProducts } from '@/data/products'

export default async function HomePage() {
  const products = staticProducts

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center min-h-[calc(100vh-80px)] px-6 text-center overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center mt-10">
          <div className="mb-8 px-5 py-2 border border-indigo-500/50 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-[0.3em] bg-indigo-500/10 backdrop-blur-md">
            ✦ Next Generation Fashion
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            SHAPE THE
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              FUTURE
            </span>
          </h1>

          <div className="max-w-2xl text-lg md:text-xl text-gray-300 mb-12 font-light leading-relaxed tracking-wide">
            <p>Immerse yourself in technology-driven streetwear.</p>
            <p className="mt-2">
              <span className="text-white font-medium border-b border-cyan-400/50">Ultra-premium fabrics</span>, 
              bold silhouettes, and accessories designed for the 
              <span className="text-cyan-400 font-semibold"> digital generation</span>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-md md:max-w-none">
            <Link href="/shop" className="w-full md:w-auto px-12 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_rgba(79,70,229,0.8)] text-center">
              Shop Now
            </Link>
            <Link href="/shop" className="w-full md:w-auto px-12 py-4 bg-white/5 border border-white/20 hover:border-cyan-400 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10 hover:text-cyan-300 backdrop-blur-md text-center">
              Explore Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Drops</h2>
          <Link href="/shop" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-md"
            >
              <div className={`h-48 bg-gradient-to-br ${product.bg} flex items-center justify-center`}>
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{product.icon}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-cyan-400 font-bold">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tighter mb-4">
              Shop<span className="text-cyan-400">Easy</span>
            </h3>
            <p className="text-gray-400 text-sm">Engineered for tomorrow. Worn today.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Arch</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
        </div>
      </footer>
    </main>
  )
}