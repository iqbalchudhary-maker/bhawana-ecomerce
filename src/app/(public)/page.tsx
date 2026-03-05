"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

// 1. Product ki Type define karein (Ab 'any' ki zaroorat nahi)
interface Product {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  // 2. State mein Product interface use karein
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const slides = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav className="bg-white sticky top-0 z-50 border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <Link href="/" className="text-2xl font-bold text-blue-700 italic">BHAWANA-ECOM</Link>
        <div className="flex items-center space-x-6 text-gray-700">
          <Link href="/login" className="hover:text-blue-600 transition"><User size={24} /></Link>
          <Link href="/cart" className="relative bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
            <ShoppingCart size={20} />
          </Link>
        </div>
      </nav>

      <header className="relative w-full h-[450px] overflow-hidden bg-gray-200">
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            alt={`Slide ${index + 1}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-center px-4">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
             <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">New Season Arrivals</h1>
             <p className="text-white mt-4 text-lg hidden md:block">Quality products at your doorstep.</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 border-l-4 border-blue-600 pl-4 text-black">Latest Collection</h2>
          <span className="text-blue-600 font-semibold cursor-pointer">View All</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              // 3. 'any' hat gaya, ab 'product' auto-typed hai
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed">
                <p className="text-gray-500 text-lg">No products found. Add some from the Dashboard!</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-gray-300 py-10 mt-auto px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl font-bold text-white mb-2 italic">BHAWANA-ECOM</p>
          <p>© 2026 Iqbal Chudhary Maker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}