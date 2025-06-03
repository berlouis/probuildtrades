import { useEffect } from "react";

export default function StripeCheckoutPage() {
  useEffect(() => {
    const createSession = async () => {
      try {
        const res = await fetch("/api/stripe/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: "price_1RJc4XPMbW05DzZEaovYnP0D",
          }),
        });

        const data = await res.json();
        if
 (data.url) {
          window.location.href = data.url;
        } else {
          console.error("No session URL returned:", data);
        }
      } catch (error) {
        console.error("Stripe checkout error:", error);
      }
    };

    createSession();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to Stripe Checkout...</p>
    </div>
  );
}
