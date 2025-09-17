"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("orders");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // === Fetch Orders ===
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/orders", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } else {
        setError(data.error || `Failed to fetch orders: ${res.status}`);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  // === Fetch Products ===
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/product/pro", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setProducts(Array.isArray(data) ? data : data.products || []);
      } else {
        setError(data.error || `Failed to fetch products: ${res.status}`);
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  // === Add Product ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Product name is required");
    if (!price || isNaN(price) || parseFloat(price) <= 0)
      return toast.error("Valid price is required");

    try {
      setSubmitting(true);
      const res = await fetch("/api/product/pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          price: parseFloat(price),
          description: description.trim(),
          image: image.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Product added successfully");
        setName("");
        setPrice("");
        setDescription("");
        setImage("");
        if (activeTab === "products") fetchProducts();
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // === Delete Product ===
  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/product/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== productId));
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error("Error deleting product");
    }
  };

  // === Hooks ===
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      toast.error("Please login first");
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (activeTab === "orders") fetchOrders();
    else if (activeTab === "products") fetchProducts();
  }, [activeTab, status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  if (status !== "authenticated") return null;

  // === Navigation Items ===
  const navItems = [
    { id: "account", label: "Account", icon: "⚙️" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "add-product", label: "Add a Product", icon: "➕" },
    { id: "products", label: "Products", icon: "🛍️" },
    { id: "analytics", label: "Analytics", icon: "📊" },
  ];

  // === Product Card ===
  const ProductCard = ({ product }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
      <div className="w-full h-40 sm:h-48 bg-gray-200 rounded mb-3 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name || "Product"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <h3 className="font-semibold mb-1 truncate">
        {product.name || "Unnamed Product"}
      </h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
        {product.description || "No description available"}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-orange-600 font-semibold text-lg">
          ${typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
        </p>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="flex-1 bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDeleteProduct(product._id)}
          className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );

  // === Render Content ===
  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Account
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md border max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={session?.user?.image || "/images/placeholder.jpg"}
                  alt="User avatar"
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <h3 className="font-semibold text-lg">{session?.user?.name}</h3>
                  <p className="text-gray-600">{session?.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Orders
            </h1>
            {loading && <p>Loading orders...</p>}
            {!loading && error && orders.length === 0 && (
              <p className="text-red-600">{error}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white p-4 rounded-lg shadow-md border"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      Order #{order._id?.slice(-6)}
                    </h3>
                    <p className="text-gray-600">Product: {order.productName}</p>
                    <p className="text-gray-600">Amount: ${order.amount}</p>
                    <p className="text-gray-600">Status: {order.status}</p>
                  </div>
                ))
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          </div>
        );

      case "products":
        return (
          <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Products
            </h1>
            {loading && <p>Loading products...</p>}
            {!loading && error && products.length === 0 && (
              <p className="text-red-600">{error}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id || Math.random()} product={product} />
                ))
              ) : (
                !loading && <p>No products found.</p>
              )}
            </div>
          </div>
        );

      case "add-product":
        return (
          <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Add a Product
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-xl"
            >
              <input
                type="text"
                placeholder="Product Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 rounded-lg"
                required
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Price *"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-3 rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-3 rounded-lg min-h-[100px]"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border p-3 rounded-lg"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
              >
                {submitting ? "Adding Product..." : "Add Product"}
              </button>
            </form>
          </div>
        );

      case "analytics":
        return (
          <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Analytics
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {products.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-4 md:p-8">Select a menu item</div>;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <nav className="w-full md:w-64 bg-white shadow-lg border-b md:border-r md:border-b-0">
        <div className="p-4 flex items-center justify-between md:block">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Nav items */}
        <ul
          className={`flex-col space-y-1 px-3 md:flex md:space-y-1 ${
            sidebarOpen ? "flex" : "hidden md:flex"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === item.id
                    ? "bg-orange-50 text-orange-600 border-l-4 md:border-l-0 md:border-r-4 border-orange-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

     
      <main className="flex-1 overflow-auto p-4 md:p-8">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
