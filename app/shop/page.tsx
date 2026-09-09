import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { products } from '@/data/products'

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-4">Latest Drops</h1>
            <p className="text-gray-400">Engineered for tomorrow. Worn today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-md"
              >
                <div className={`h-64 bg-gradient-to-br ${product.bg} flex items-center justify-center`}>
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.icon}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-cyan-400">{product.price}</span>
                    <span className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-cyan-400 transition-colors">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}