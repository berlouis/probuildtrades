import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  phoneNumber: string;
  onQuoteClick: () => void;
};

const HeroSection = ({ phoneNumber, onQuoteClick }: HeroSectionProps) => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Connect with Trusted Builders & Trades
        </h1>
        <p className="text-lg mb-8">
          Australia’s most reliable platform to find verified and licensed professionals.
        </p>
        <Link href="/plans">
          <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Get Started
          </span>
        </Link>
        <div className="mt-6">
          <button
            onClick={onQuoteClick}
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Call Now: {phoneNumber}
          </button>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
          <Image src="/images/icon1.png" alt="Icon 1" width={64} height={64} />
          <Image src="/images/icon2.png" alt="Icon 2" width={64} height={64} />
          <Image src="/images/icon3.png" alt="Icon 3" width={64} height={64} />
          <Image src="/images/icon4.png" alt="Icon 4" width={64} height={64} />
          <Image src="/images/icon5.png" alt="Icon 5" width={64} height={64} />
          <Image src="/images/icon6.png" alt="Icon 6" width={64} height={64} />
          <Image src="/images/icon7.png" alt="Icon 7" width={64} height={64} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
