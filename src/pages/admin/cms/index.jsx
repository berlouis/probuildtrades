import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const response = await axios.get('/api/admin/cms');
      setPages(response.data);
    };
    fetchPages();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Pages</h2>
      <ul>
        {pages.map(page => (
          <li key={page.id}>{page.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
