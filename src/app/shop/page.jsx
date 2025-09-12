"use client";
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Copyright from "../../../components/copyright";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductList() {
  const [ update, setUpdate ] = useState(false);
  const [ del, setDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();

  // fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/products?page=${page}&search=${query}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(search);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    toast.success(`${product.name} added to cart!`);
  }; 
  
const handleBuyNow = (product) => {
  router.push(`/product/${product._id}`);
};

  return (
    <div className="flex flex-col max-h-[350vh] gap-5 select-none">
      <Navbar />
      <h1 className="font-semibold text-2xl p-6 sm:px-32 sm:py-8 ">All Products</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="p-6 sm:px-32 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-14 sm:px-32 sm:py-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
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
                <p className="text-gray-600 line-clamp-1">{product.description}</p>
                <h2 className="text-orange-600 font-bold">${product.price}</h2>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mb-8">
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

      <Footer />
      <Copyright />
    </div>
  );
}
