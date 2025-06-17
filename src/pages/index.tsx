import React from "react";
import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import ServicesMenu from "@/components/ServicesMenu";
import RegistrationCTA from "@/components/RegistrationCTA";

export default function Home() {
  const handleQuoteClick = () => {
    alert("Quote request functionality coming soon!");
  };

  return (
    <>
      <Head>
        <title>ProBuildTrades - Home Renovation Specialists</title>
        <meta
          name="description"
          content="Sydney's best home renovation specialists. Accredited builders and trades with guaranteed free quotes."
        />
      </Head>
      <main>
        <HeroSection phoneNumber="+61402553642" onQuoteClick={handleQuoteClick} />
        <ServicesMenu />
        <RegistrationCTA />
      </main>
    </>
  );
}
