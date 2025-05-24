export async function getTranslation(id: string) {
  const res = await fetch(`/api/admin/cms/pages/translations/${id}`);
  if (!res.ok) throw new Error("Failed to fetch translation");
  return res.json();
}

export async function updateTranslation(id: string, data: any) {
  const res = await fetch(`/api/admin/cms/pages/translations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update translation");
  return res.json();
}
