import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function HomePage() {
  // Database se products fetch karna
  const products = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0, // Sirf wo products dikhayein jinka stock 0 se zyada ho
      },
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar / Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600 italic">Bhawana-Ecom</h1>
        <div className="space-x-4">
          <Link href="/cart" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
            🛒 View Cart
          </Link>
          <Link href="/login" className="text-gray-600 hover:underline">
            Admin Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-2">Welcome to Bhawana Ecommerce</h2>
        <p className="opacity-90">Quality products at your doorstep via WhatsApp</p>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products available in stock.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t p-8 mt-12 text-center text-gray-500">
        <p>© 2024 Bhawana-Ecommerce. All rights reserved.</p>
      </footer>
    </main>
  );
}