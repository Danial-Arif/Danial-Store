export default function Footer({ className = "" }) {
  return (
    <footer
      className={`flex flex-col md:flex-row justify-between items-start gap-10 px-6 sm:px-10 md:px-20 lg:px-32 py-10 ${className}`}
    >
      {/* Logo & About */}
      <div className="flex-2 flex flex-col items-start">
        <img
          className="h-[30px] mb-4"
          src="https://quickcart.greatstack.in/_next/static/media/logo.83ad3901.svg"
          alt="QuickCart Logo"
        />
        <p className="text-gray-600 text-sm md:text-base max-w-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col">
        <h1 className="font-semibold mb-4">Company</h1>
        <nav className="flex flex-col gap-2">
          <a className="text-gray-600 hover:text-gray-800 transition" href="/">
            Home
          </a>
          <a className="text-gray-600 hover:text-gray-800 transition" href="https://github.com/Danial-Arif/">
            About Us
          </a>
          <a className="text-gray-600 hover:text-gray-800 transition" href="https://github.com/Danial-Arif/">
            Contact
          </a>
          <a className="text-gray-600 hover:text-gray-800 transition" href="/">
            Privacy Policy
          </a>
        </nav>
      </div>

      {/* Contact */}
      <div className="flex-1 flex flex-col">
        <h1 className="font-semibold mb-4">Get in Touch</h1>
        <p className="text-gray-600 text-sm md:text-base">+1-234-567-890</p>
        <p className="text-gray-600 text-sm md:text-base">contact@greatstack.dev</p>
      </div>
    </footer>
  );
}
