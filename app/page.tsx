"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/hooks/useSupabase";

export default function Home() {
  const [findSession, setFindSession] = useState<any | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setFindSession(session);
        router.push("/notes");
      } else {
        router.push("/auth/signup");
      }
    }
    getSession();
  }, [supabase]);

  return <></>;
}
