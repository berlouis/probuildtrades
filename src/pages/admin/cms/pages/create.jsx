import { useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/admin/AdminLayout'

export default function CreateCMSPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/cms/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, metaTitle, metaDescription })
    })

    if (res.ok) {
      router.push('/admin/cms/pages')
    } else {
      console.error(await res.text())
    }
  }

  return (
    <AdminLayout title="Create CMS Page">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Page Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Meta Title (SEO Title)"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Meta Description (SEO Description)"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={4}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Save Page
        </button>
      </form>
    </AdminLayout>
  )
}
