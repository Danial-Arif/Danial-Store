"use client";
import Image from "next/image";

const ProductList = () => {
  return (
    <section className="py-12 px-6 md:px-12">
      <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="w-full h-60 relative">
              <Image
                src={product.imgSrc}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="p-4 flex flex-col">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-orange-600 font-semibold mt-2">
                {product.price}
              </p>

              <button className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
