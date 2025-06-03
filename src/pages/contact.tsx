import Head from "next/head";
import Image from "next/image";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | ProBuildTrades</title>
        <meta name="description" content="Get in touch with our support or sales team." />
      </Head>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-6">We’d love to hear from you. Reach out using the info below.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="mb-2">📍 123 Builder Lane, Sydney, NSW</p>
            <p className="mb-2">📞 +61 402 553 642</p>
            <p className="mb-2">✉️ contact@probuildtrades.com</p>

            <div className="mt-6">
              <Image
                src="/images/contact-map.png"
                alt="Map showing our location"
                width={500}
                height={300}
                className="rounded-md shadow"
              />
            </div>
          </div>

          <div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-4 py-2 rounded"
              />
              <textarea
                placeholder="Your Message"
                className="w-full border px-4 py-2 rounded h-32"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
