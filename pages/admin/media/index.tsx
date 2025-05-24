import { useState } from "react";
import axios from "axios";

export default function MediaUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      setUploading(true);
      const res = await axios.post("/api/admin/media/upload", formData);
      setUploadResult(res.data);
    } catch (err: any) {
      console.error("Upload failed:", err);
      setUploadResult({ error: "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Media Upload</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadResult && (
        <div className="mt-4">
          <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
