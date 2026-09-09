"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_urls?: string[];
  inventory?: number;
  is_published?: boolean;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  // ✅ Debug log – session and status
  console.log("Admin page - status:", status, "session:", session);

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // ✅ Fetch products when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts();
    }
  }, [status]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: parseInt(form.price),
          description: form.description,
          imageUrl: form.imageUrl,
        }),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setForm({ name: "", price: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black">Admin Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-full transition-colors"
          >
            Sign Out
          </button>
        </div>
        <p className="text-gray-400 mb-8">Welcome, {session.user?.email}!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full p-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price (in Naira)"
                className="w-full p-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold transition-colors"
              >
                Add Product
              </button>
            </form>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Manage Products</h2>
            {products.length === 0 ? (
              <p className="text-gray-400">No products yet. Add your first product!</p>
            ) : (
              <ul className="space-y-2">
                {products.map((p) => (
                  <li key={p.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                    <span>{p.name}</span>
                    <span className="text-cyan-400">₦{(p.price / 100).toFixed(2)}</span>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}