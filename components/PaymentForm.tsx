import { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function PaymentForm({ subscriptionId }: { subscriptionId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError("");
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not loaded");
      setProcessing(false);
      return;
    }
    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (createError || !paymentMethod) {
      setError(createError?.message || "Error creating payment method");
      setProcessing(false);
      return;
    }
    try {
await axios.post('/api/subscription/attach-payment-method', {
        subscriptionId,
        paymentMethodId: paymentMethod.id,
      });
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to attach payment method");
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe || processing} style={{ marginTop: 16 }}>
        {processing ? 'Processing...' : 'Update Payment Method'}
      </button>
    </form>
  );
}
