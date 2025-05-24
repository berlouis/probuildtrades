import { useEffect } from "react";
import { useRouter } from "next/router";

export function useRequireAdmin() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Replace with actual admin check from session or context
    const isAdmin = true;

    if (!isAdmin) {
      router.push("/unauthorized");
    }
  }, [router]);
}
