import Link from 'next/link';

export default function BuildersPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Builder Dashboard</h1>
      <p>Manage registered builders here.</p>
      <Link href="/admin/builders/create">
        <button style={{ marginTop: '1rem' }}>+ Create New Builder</button>
      </Link>
    </div>
  );
}
