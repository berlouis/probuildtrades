import React from "react";
import HeroSection from "./HeroSection";
import ServicesMenu from "./ServicesMenu";

const Homepage: React.FC = () => {
  const phoneNumber = "123-456-7890"; // Replace with actual phone number

  const handleQuoteClick = () => {
    alert("Get a free quote clicked!");
    // Implement navigation or modal popup here
  };

  return (
    <div>
      <HeroSection phoneNumber={phoneNumber} onQuoteClick={handleQuoteClick} />
      <ServicesMenu />
    </div>
  );
};

export default Homepage;
