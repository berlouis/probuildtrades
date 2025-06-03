import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PagesManagement = () => {
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState({ title: '', content: '' });

  // Fetch pages from API on mount
  useEffect(() => {
    const fetchPages = async () => {
      const response = await axios.get('/api/admin/cms/pages');
      setPages(response.data);
    };
    fetchPages();
  }, []);

  // Handle form submit to create a new page
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/admin/cms/pages', newPage);
    setPages([...pages, response.data]);
    setNewPage({ title: '', content: '' }); // Reset form fields
  };

  // Handle delete page
  const handleDelete = async (id) => {
    await axios.delete();
    setPages(pages.filter((page) => page.id !== id)); // Remove deleted page from state
  };

  return (
    <div>
      <h2>Manage Pages</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newPage.title}
            onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={newPage.content}
            onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create Page</button>
      </form>

      <h3>Existing Pages</h3>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <h4>{page.title}</h4>
            <p>{page.content}</p>
            <button onClick={() => handleDelete(page.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagesManagement;
