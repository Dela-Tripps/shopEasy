import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-8">Curated Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['New Arrivals', 'Streetwear', 'Accessories'].map((collection) => (
            <Link
              key={collection}
              href={`/shop?collection=${collection.toLowerCase().replace(' ', '-')}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all"
            >
              <h2 className="text-2xl font-bold">{collection}</h2>
              <p className="text-gray-400 mt-2">Explore the {collection.toLowerCase()} collection</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}