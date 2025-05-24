import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">ProBuildTrades</h3>
          <p>Building trust across Australia.</p>
          <div className="mt-4">
            <Image src="/images/logo-footer.png" alt="Footer Logo" width={120} height={60} />
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <Image src="/images/icon-facebook.png" alt="Facebook" width={24} height={24} />
            <Image src="/images/icon-twitter.png" alt="Twitter" width={24} height={24} />
            <Image src="/images/icon-linkedin.png" alt="LinkedIn" width={24} height={24} />
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/plans">Plans</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
