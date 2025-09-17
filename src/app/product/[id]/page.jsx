"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import Navbar from "../../../../components/navbar";
import Footer from "../../../../components/footer";
import Copyright from "../../../../components/copyright";

export default function ProductPage({ params }) {
  const { id } = params; // ✅ FIXED: don't use `use(params)`
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // ✅ Added cart state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/product/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          router.push("/404");
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!product) return null;

  const handleAddToCart = () => {
    setCart((prev) => [...prev, product]); // ✅ Add product to cart
    toast.success(`${product.name} added to cart`);
  };

  const handleBuy = async () => {
    if (!session) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product.name,
          amount: product.price,
          customerName: session.user.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully!");
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 h-auto md:min-h-[70vh]">
        {/* Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full min-w-[300px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-start gap-4 p-2 md:p-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm md:text-base">
            {product.description}
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-orange-600">
            ${product.price}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleAddToCart} // ✅ Fixed syntax + logic
              className="w-full sm:w-auto px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuy}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded text-sm hover:bg-green-600 transition-colors"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
}
