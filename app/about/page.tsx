// app/about/page.tsx
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <section className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black mb-8">Our Mission</h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          ShopEasy is not just a store; it's a glimpse into the future. 
          We combine cutting-edge technology with high-fashion design to bring you apparel 
          and accessories that look incredible and function even better.
        </p>
      </section>
    </main>
  );
}