"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/products?page=${page}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">
          No products found. Add some products first!
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="flex justify-center items-center mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-52 object-cover rounded-lg"
              />
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-lg font-semibold">{product.name}</h1>
              <p className="text-gray-600 line-clamp-2">{product.description}</p>
              <h2 className="text-orange-600 font-bold">${product.price}</h2>

              <div className="flex gap-2 mt-4">
                <button  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                  Add to cart
                </button>
                <Link href={`/product/${product._id}`}>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
