// app/contact/page.tsx
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <section className="py-20 px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-8 text-center">Get in Touch</h1>
        
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <label className="block text-gray-400 mb-2">Name</label>
            <input type="text" className="w-full bg-transparent border-b border-white/20 focus:border-cyan-400 outline-none py-2" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <label className="block text-gray-400 mb-2">Email</label>
            <input type="email" className="w-full bg-transparent border-b border-white/20 focus:border-cyan-400 outline-none py-2" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 focus:border-cyan-400 outline-none py-2" />
          </div>
          <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold text-lg transition-colors">
            Send Message
          </button>
        </div>
      </section>
    </main>
  );
}