import Head from "next/head";
import Image from "next/image";

export default function Plans() {
  return (
    <>
      <Head>
        <title>Subscription Plans | ProBuildTrades</title>
        <meta name="description" content="Choose the right subscription plan for your trade business." />
      </Head>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded p-6 shadow">
            <Image src="/images/plan-basic.png" alt="Basic Plan" width={80} height={80} />
            <h2 className="text-xl font-semibold mt-4">Basic</h2>
            <p className="my-2">$19/month</p>
            <ul className="list-disc ml-5 text-sm mb-4">
              <li>Profile listing</li>
              <li>1 location</li>
              <li>Email support</li>
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Select Plan
            </button>
          </div>

          <div className="border rounded p-6 shadow">
            <Image src="/images/plan-pro.png" alt="Pro Plan" width={80} height={80} />
            <h2 className="text-xl font-semibold mt-4">Pro</h2>
            <p className="my-2">$49/month</p>
            <ul className="list-disc ml-5 text-sm mb-4">
              <li>Priority listing</li>
              <li>Up to 3 locations</li>
              <li>Phone + Email support</li>
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Select Plan
            </button>
          </div>

          <div className="border rounded p-6 shadow">
            <Image src="/images/plan-enterprise.png" alt="Enterprise Plan" width={80} height={80} />
            <h2 className="text-xl font-semibold mt-4">Enterprise</h2>
            <p className="my-2">$99/month</p>
            <ul className="list-disc ml-5 text-sm mb-4">
              <li>Top ranking</li>
              <li>Unlimited locations</li>
              <li>Dedicated support</li>
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Select Plan
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
