import React from "react";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const ServicesMenu: React.FC = () => {
  const services: Service[] = [
    {
      title: "Builders",
      description: "Register as a licensed builder.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10h16V7H4z" />
        </svg>
      ),
      onClick: () => {
        alert("Builders service clicked");
      },
    },
    {
title: "Trades",
      description: "Register as a qualified tradesperson.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6" />
        </svg>
      ),
      onClick: () => {
        alert("Trades service clicked");
      },
    },
  ];
return (
    <section className="max-w-4xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            onClick={service.onClick}
            className="cursor-pointer border border-gray-300 rounded-lg p-6 flex items-center space-x-6 hover:shadow-lg transition-shadow duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                service.onClick();
              }
            }}
          >
            <div className="flex-shrink-0">{service.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-1">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ServicesMenu;
