"use client"
import { useEffect, useState } from 'react'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const confirmOrder = async () => {
    const phone = "923454776617"
    const message = `New Order: ${cart.map(i => i.name).join(', ')}`
    
    // 1. WhatsApp Redirect
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")

    // 2. Update Stock in DB
    await fetch('/api/confirm-order', {
      method: 'POST',
      body: JSON.stringify({ items: cart })
    })

    localStorage.removeItem('cart')
    alert("Order Confirmed & Stock Updated!")
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.map((item, idx) => (
        <div key={idx} className="border-b py-2">{item.name} - Rs. {item.price}</div>
      ))}
      <button onClick={confirmOrder} className="mt-6 bg-green-700 text-white px-6 py-3 rounded">
        Confirm via WhatsApp
      </button>
    </div>
  )
}