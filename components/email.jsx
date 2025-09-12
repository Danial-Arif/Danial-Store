import Link from "next/link";
export default function Email() {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center px-6 text-center ">
        <h1 className="text-3xl font-bold mb-4">
          Thanks for Shopping with Us 🛒
        </h1>
        <p className="max-w-xl text-gray-600 mb-6">
          We’re thrilled to have you as part of our community. Your purchase helps
          us grow, and we promise to keep bringing you the best products and
          services. If you ever need help, our team is just a message away.
        </p>
        <p className="text-lg font-medium mb-4">Happy Shopping! 🎉</p>
        <Link href='https://github.com/Danial-Arif/'>
        <button className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition">
          Contact Us
        </button>
        </Link>
      </div>
    );
  }
  