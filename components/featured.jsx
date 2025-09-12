import Link from "next/link";
export default function Featured() {
    return (
      <div className="flex justify-center items-center min-h-[80vh] flex-col px-6">
        <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
  
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Card 1 */}
          <div
            className="relative card h-[350px] w-[300px] flex flex-col justify-end 
            bg-[url('https://quickcart.greatstack.in/_next/static/media/girl_with_headphone_image.8cdb8255.png')] 
            bg-cover bg-center rounded-xl shadow-lg p-4 text-white 
            overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 rounded-xl"></div>
            <div className="relative z-10 transition-all duration-500 group-hover:translate-y-[-10px]">
              <h1 className="text-[1.25rem] font-bold">Unparalleled Sound</h1>
              <p className="text-sm mb-2">
                Experience crystal-clear audio with premium headphones.
              </p>
              <Link href='/shop'>
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold">
                Buy Now
              </button>
              </Link>
            </div>
          </div>
  
          {/* Card 2 */}
          <div
            className="relative card h-[350px] w-[300px] flex flex-col justify-end 
            bg-[url('https://quickcart.greatstack.in/_next/static/media/girl_with_earphone_image.604badd7.png')] 
            bg-cover bg-center rounded-xl shadow-lg p-4 text-white 
            overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 rounded-xl"></div>
            <div className="relative z-10 transition-all duration-500 group-hover:translate-y-[-10px]">
              <h1 className="text-[1.25rem] font-bold">Immersive Beats</h1>
              <p className="text-sm mb-2">
                Dive into deep bass with high-quality earphones.
              </p>
              <Link href='/shop'>
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold">
                Buy Now
              </button>
              </Link>
            </div>
          </div>
  
          {/* Card 3 */}
          <div
            className="relative card h-[350px] w-[300px] flex flex-col justify-end 
            bg-[url('https://quickcart.greatstack.in/_next/static/media/boy_with_laptop_image.19edbd3e.png')] 
            bg-cover bg-center rounded-xl shadow-lg p-4 text-white 
            overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 rounded-xl"></div>
            <div className="relative z-10 transition-all duration-500 group-hover:translate-y-[-10px]">
              <h1 className="text-[1.25rem] font-bold">Work & Play</h1>
              <p className="text-sm mb-2">
                Boost your productivity with sleek laptops.
              </p>
              <Link href='/shop'>
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold">
                Buy Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  