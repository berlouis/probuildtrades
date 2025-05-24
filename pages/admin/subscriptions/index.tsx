import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import axios from 'axios';

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/subscriptions/cancel');
      if (res.data.success) {
        alert('Subscription cancelled successfully.');
        router.reload();
      } else {
        alert('Failed to cancel subscription.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while cancelling.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Subscription Management">
      <h2 className="text-xl font-bold mb-4">Manage Your Subscription</h2>
      <p className="mb-4 text-gray-700">
        If you wish to cancel your subscription, you may do so below. Note that you will be removed from the platform.
      </p>
      <button
        onClick={handleCancel}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        {loading ? 'Cancelling...' : 'Cancel Subscription'}
      </button>
    </AdminLayout>
  );
}
