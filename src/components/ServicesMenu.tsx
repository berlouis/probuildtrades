import React from "react";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
};

const services: Service[] = [
  {
    title: "Builders",
    description: "Register as a licensed builder.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10h16V7H4z" />
      </svg>
    ),
    href: "/register/builder",
  },
  {
    title: "Trades",
    description: "Register as a qualified tradesperson.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6" />
      </svg>
    ),
    href: "/register/trade",
  },
  {
    title: "Companies",
    description: "Register as a registered company.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect x="4" y="7" width="16" height="10" rx="2" />
        <path d="M9 17V9a3 3 0 016 0v8" />
      </svg>
    ),
    href: "/register/company",
  },
];

const ServicesMenu: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="w-full border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 shadow hover:shadow-md transition-shadow duration-200 text-left bg-white hover:bg-blue-50 focus:outline-none"
            style={{ cursor: "pointer", minHeight: 120 }}
          >
            <div>{service.icon}</div>
            <div className="text-lg font-semibold">{service.title}</div>
            <div className="text-gray-600 text-sm">{service.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServicesMenu;
