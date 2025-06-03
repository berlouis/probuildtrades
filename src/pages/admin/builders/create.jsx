import { useState } from 'react';
import { useRouter } from 'next/router';

function BuilderCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    trade: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/admin/builders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create builder');

      router.push('/admin/builders');
    } catch (err) {
      setError(err.message || 'Unexpected error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create New Builder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>License Number:</label><br />
          <input
            type="text"
            name="license"
            value={formData.license}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Trade Type:</label><br />
          <input
            type="text"
            name="trade"
            value={formData.trade}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Create Builder
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default BuilderCreatePage;
