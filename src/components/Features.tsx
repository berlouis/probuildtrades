import Image from "next/image";

export default function Features() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Image src="/images/dashboard.png" alt="Dashboard" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="font-semibold">Easy Dashboard</h3>
            <p>Manage your profile, documents, and clients with ease.</p>
          </div>
          <div>
            <Image src="/images/secure.png" alt="Security" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="font-semibold">Secure Verification</h3>
            <p>Our backend handles compliance, risk flags, and license checks.</p>
          </div>
          <div>
            <Image src="/images/analytics.png" alt="Analytics" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="font-semibold">Real Analytics</h3>
            <p>Track views, leads, and license status in real-time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
