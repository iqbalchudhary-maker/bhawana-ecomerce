"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle, Package, LogOut, Trash2 } from 'lucide-react'

export default function Dashboard() {
  const [isAllowed, setIsAllowed] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: ''
  })

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    if (loggedIn !== 'true') {
      router.push('/login')
    } else {
      setIsAllowed(true)
      fetchProducts()
    }
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      })
    })

    if (res.ok) {
      alert("Product added successfully!")
      setFormData({ name: '', price: '', stock: '', image: '' })
      fetchProducts() // List refresh karein
    } else {
      alert("Failed to add product")
    }
    setLoading(false)
  }

  if (!isAllowed) return <p className="p-10 text-center">Authenticating...</p>

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-10 italic">BHAWANA ADMIN</h2>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-blue-400 bg-slate-800 p-3 rounded">
            <Package size={20} /> Inventory
          </div>
          <button 
            onClick={() => { localStorage.removeItem('isLoggedIn'); router.push('/login'); }}
            className="flex items-center gap-3 text-gray-400 hover:text-red-400 p-3 transition w-full"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        </div>

        {/* --- ADD PRODUCT FORM --- */}
        <section className="bg-white p-6 rounded-xl shadow-sm border mb-10">
          <div className="flex items-center gap-2 mb-6 font-semibold text-gray-700">
            <PlusCircle size={20} className="text-blue-600" /> Add New Product
          </div>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" placeholder="Product Name" required
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="number" placeholder="Price (Rs.)" required
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
            />
            <input 
              type="number" placeholder="Stock Quantity" required
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})}
            />
            <input 
              type="text" placeholder="Image URL" required
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
            />
            <button 
              disabled={loading}
              className="md:col-span-4 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Product to Database"}
            </button>
          </form>
        </section>

        {/* --- PRODUCT LIST TABLE --- */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 rounded object-cover border" alt="" />
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </td>
                  <td className="p-4 text-sm font-semibold">
                    {p.stock <= 5 ? <span className="text-red-500">{p.stock} (Low)</span> : <span>{p.stock}</span>}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-600">Rs. {p.price}</td>
                  <td className="p-4 text-center">
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}