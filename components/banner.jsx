import Link from "next/link";

export default function Banner() {
  return (
    <div className="bg-[#e6e9f2] flex flex-col md:flex-row items-center md:items-start justify-between h-auto md:h-[350px] overflow-hidden rounded-lg gap-6 p-6 md:p-10">
      
      <div className="flex-1 flex items-center justify-center">
        <img
          className="max-h-[180px] sm:max-h-[220px] md:max-h-full object-contain"
          src="https://quickcart.greatstack.in/_next/static/media/jbl_soundbox_image.c02bcfd7.png"
          alt="Soundbox"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
          Level Up Your Gaming Experience
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-md">
          From immersive sound to precise controls—everything you need to win
        </p>

        <Link
          href="/shop"
          className="w-fit px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition"
        >
          Buy Now
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          className="max-h-[180px] sm:max-h-[220px] md:max-h-full object-contain"
          src="https://quickcart.greatstack.in/_next/static/media/md_controller_image.036005e4.png"
          alt="Controller"
        />
      </div>
    </div>
  );
}
