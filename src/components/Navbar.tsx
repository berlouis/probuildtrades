import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
            <span className="font-bold text-xl text-blue-700">ProBuildTrades</span>
          </div>
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link href="/plans" className="text-gray-700 hover:text-blue-600">
            Plans
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
          <Link href="/admin/login" className="text-gray-700 hover:text-blue-600">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
