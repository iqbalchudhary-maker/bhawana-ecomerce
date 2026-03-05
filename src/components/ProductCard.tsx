// src/components/ProductCard.tsx
"use client"
export default function ProductCard({ product }: { product: any }) {
  const addToCart = (p: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(p);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="font-bold">{product.name}</h2>
      <p>Rs. {product.price}</p>
      <button 
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}