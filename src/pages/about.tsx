import Head from "next/head";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | ProBuildTrades</title>
        <meta name="description" content="Learn more about the ProBuildTrades team and our mission." />
      </Head>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="mb-4">
          ProBuildTrades is dedicated to connecting Australians with licensed and trusted tradespeople and builders across the country.
        </p>
        <p className="mb-4">
          Our mission is to ensure safety, reliability, and transparency in the construction and home improvement industries.
        </p>

        <div className="my-8">
          <Image
            src="/images/about-team.jpg"
            alt="Our team working on a build site"
            width={800}
            height={400}
            className="rounded-lg shadow"
          />
        </div>

        <p className="mb-4">
          With a growing network of professionals and an AI-powered verification system, we make sure you get the right person for the job — every time.
        </p>
        <p className="mb-4">
          Thank you for choosing ProBuildTrades as your trusted construction partner.
        </p>
      </main>
    </>
  );
}
