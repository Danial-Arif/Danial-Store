"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";


export default function ProductPreview() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product/products");
        const data = await res.json();
        setProducts(data.products?.slice(0, 3) || []); 
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    toast.success(`${product.name} added to cart!`);
  }; 
  

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-bold">Featured Products</h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-auto object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 line-clamp-1">{product.description}</p>
            <h4 className="text-orange-600 font-bold">${product.price}</h4>

            <div className="flex sm:flex-row flex-col gap-2 mt-4">
              <button onClick={() => handleAddToCart(product)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                Add to cart
              </button>
              <Link href={`/product/${product._id}`}>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Buy Now
              </button>
              </Link>            
            </div>
          </div>
        ))}
      </div>

      <div className="my-8 flex justify-center">
        <Link
          href="/shop"
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          See more
        </Link>
      </div>
    </div>
  );
}
