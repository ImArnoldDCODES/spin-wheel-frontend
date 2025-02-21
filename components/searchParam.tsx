import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TokenHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token")?.trim();

    if (token) {
      sessionStorage.setItem("token", token);
      router.replace("/admin/dashboard");
    } else {
      console.error("No token found in the query params");
    }
  }, [searchParams, router]);

  return null;
}
