import Image from "next/image";

export default function WhyUs() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose ProBuildTrades?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Image src="/images/reliable.png" alt="Reliable" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="font-semibold">Reliable Trades</h3>
            <p>We vet every professional to ensure quality service delivery.</p>
          </div>
          <div className="text-center">
            <Image src="/images/verified.png" alt="Verified" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="font-semibold">Verified Licenses</h3>
            <p>Our system cross-checks builder credentials with government databases.</p>
          </div>
          <div className="text-center">
            <Image src="/images/support.png" alt="Support" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="font-semibold">Support On Demand</h3>
            <p>We’re always here to help, every step of the way.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
