import React from "react";
import ServicesMenu from "./ServicesMenu";

const ServicesMenuExample: React.FC = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Our Services</h2>
      <ServicesMenu />
    </section>
  );
};

export default ServicesMenuExample;
