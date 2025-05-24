export async function fetchLicenseStatusFromGovAPI({
  licenseId,
  stateCode,
  apiKey,
  apiUrl,
}: {
  licenseId: string;
  stateCode: string;
  apiKey: string;
  apiUrl: string;
}): Promise<"Active" | "Suspended" | "Expired" | "Unknown"> {
  try {
    const res = await fetch(`${apiUrl}/license/${licenseId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`API ${stateCode} responded ${res.status}`);

    const data = await res.json();
    const status = data.status?.toLowerCase();

    if (status.includes("active")) return "Active";
    if (status.includes("suspend")) return "Suspended";
    if (status.includes("expire")) return "Expired";
    return "Unknown";

  } catch (err) {
    console.error(`Fetch error for ${stateCode}:`, err);
    return "Unknown";
  }
}
