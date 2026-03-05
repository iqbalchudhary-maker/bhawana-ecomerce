"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [products, setProducts] = useState([])

  // 5 Placeholder Images for Header Slider
  const slides = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop"
  ]

  // Auto-slide logic (Har 5 seconds baad image badlegi)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Fetch Products
  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data))
  }, [])

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* --- DYNAMIC NAVBAR --- */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black text-blue-700 tracking-tighter">
          BHAWANA<span className="text-gray-900">-ECOM</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="#shop" className="hover:text-blue-600 transition">Shop</Link>
          <Link href="/cart" className="hover:text-blue-600 transition">Collection</Link>
        </div>

        <div className="flex items-center space-x-5">
          <Link href="/login" title="Admin Login" className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
            <User size={22} />
          </Link>
          <Link href="/cart" className="relative p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            <ShoppingCart size={20} />
          </Link>
        </div>
      </nav>

      {/* --- HEADER IMAGE SLIDER --- */}
      <header className="relative w-full h-[500px] overflow-hidden group">
        {slides.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay for text readability */}
            <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">New Arrival 2026</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">Premium quality products at the best prices. Order now via WhatsApp.</p>
              <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:scale-105 transition transform">
                Explore Shop
              </button>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length-1 : currentSlide-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
          <ChevronLeft size={30} />
        </button>
        <button onClick={() => setCurrentSlide(currentSlide === slides.length-1 ? 0 : currentSlide+1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
          <ChevronRight size={30} />
        </button>
      </header>

      {/* --- MAIN PRODUCTS SECTION --- */}
      <main id="shop" className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Best Sellers</span>
            <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <Link href="/cart" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">View All Products</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      {/* --- MODERN DYNAMIC FOOTER --- */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-2xl font-bold mb-6 italic">BHAWANA</h3>
            <p className="text-sm leading-relaxed mb-6">Chiniot, Punjab ki behtareen e-commerce service jo aap tak fast delivery aur best quality products pohanchati hai.</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">f</div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">t</div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">ig</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/cart" className="hover:text-blue-400">Shopping Cart</Link></li>
              <li><Link href="/login" className="hover:text-blue-400">Admin Dashboard</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Terms & Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-blue-500" /> Chiniot, Punjab, Pakistan</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-blue-500" /> +92 345 4776617</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-blue-500" /> info@bhawana-ecom.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Newsletter</h4>
            <p className="text-xs mb-4">Latest deals ke liye apna email likhein.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-gray-800 border-none px-4 py-2 w-full focus:ring-1 focus:ring-blue-500 rounded-l" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition">Go</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 text-center text-xs opacity-60">
          <p>© 2026 Bhawana-Ecom. Developed with Passion for Chiniot.</p>
        </div>
      </footer>
    </div>
  )
}