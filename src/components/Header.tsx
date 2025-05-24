import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center max-w-7xl mx-auto">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">ProBuildTrades</Link>
      </div>
      <ul className="flex space-x-6">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/contact" className="text-blue-600 font-semibold">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
