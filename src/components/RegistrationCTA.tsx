import React from "react";
import Link from "next/link";

const cards = [
  {
    title: "Licensed Builder",
    description: "Become a registered builder and access exclusive project leads.",
    link: "/register/builder",
    button: "Register as Builder",
  },
  {
    title: "Qualified Tradesperson",
    description: "Join our network of trusted trades and grow your business.",
    link: "/register/trade",
    button: "Register as Trade",
  },
  {
    title: "Registered Company",
    description: "Register your company to manage multiple builders and trades under one account.",
    link: "/register/company",
    button: "Register as Company",
  },
];

const RegistrationCTA = () => (
  <section className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    {cards.map((card) => (
      <div key={card.title} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start">
        <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
        <p className="mb-4">{card.description}</p>
        <Link href={card.link}>
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
            {card.button}
          </span>
        </Link>
      </div>
    ))}
  </section>
);

export default RegistrationCTA;
