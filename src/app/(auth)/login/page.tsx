"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(form)
    })
    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true') // Simple protection
      router.push('/dashboard')
    } else {
      alert("Invalid credentials!")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="p-8 border rounded shadow-lg flex flex-col gap-4 w-96">
        <h1 className="text-2xl font-bold">Bhawana Login</h1>
        <input type="text" placeholder="Username" className="border p-2" onChange={e => setForm({...form, username: e.target.value})} />
        <input type="password" placeholder="Password" className="border p-2" onChange={e => setForm({...form, password: e.target.value})} />
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}