"use client"

// Product ki sahi shape (Interface) define karein
interface Product {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

// Yahan 'any' ko hata kar 'Product' interface use karein
export default function ProductCard({ product }: { product: Product }) {
  
  const addToCart = () => {
    // LocalStorage se purana cart uthayen
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Naya product cart mein add karein
    cart.push(product)
    
    // Wapas save karein
    localStorage.setItem('cart', JSON.stringify(cart))
    
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition">
      {/* Product Image */}
      <img 
        src={product.image} 
        className="w-full h-48 object-cover rounded border" 
        alt={product.name} 
      />
      
      {/* Product Details */}
      <h3 className="text-xl font-semibold mt-2 text-black">{product.name}</h3>
      <p className="text-gray-600 text-sm">Stock: {product.stock}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-blue-600">Rs. {product.price}</span>
        
        <button 
          onClick={addToCart} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}