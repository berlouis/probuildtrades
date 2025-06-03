import Head from "next/head";
import Image from "next/image";

export default function Success() {
  return (
    <>
      <Head>
        <title>Payment Successful | ProBuildTrades</title>
        <meta name="description" content="Thank you for subscribing to ProBuildTrades!" />
      </Head>
      <main className="container mx-auto px-4 py-16 text-center">
        <Image
          src="/images/success.png"
          alt="Success checkmark"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="mb-6">Your subscription has been activated successfully.</p>
        <p className="text-sm text-gray-600">You may now access your dashboard and start getting leads.</p>
      </main>
    </>
  );
}
