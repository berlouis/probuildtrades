import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBuildersPage() {
  const [builders, setBuilders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unflaggingId, setUnflaggingId] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");
  return (
    <div>
      <h1>Admin Builders Dashboard</h1>
      {/* Your UI goes here */}
      <p>Loading dashboard UI...</p>
    </div>
  );
}

