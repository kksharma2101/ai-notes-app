"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/hooks/useSupabase";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [note, setNote] = useState("");
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchUpdateNote() {
      const { data: res, error } = await supabase
        .from("note")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) console.log("Error in fetch single note", error);
      setNote(res.content);
    }
    fetchUpdateNote();
  }, [supabase]);

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("note")
        .update({ content: note, created_at: new Date().toISOString() })
        .eq("id", params.id)
        .select("*");

      if (error) console.log("error in update note");
      router.push("/notes");
    } catch (error) {
      console.log("Error in update Note", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 my-4">
      <Textarea
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[150px]"
      />
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={handleUpdate}
          className="cursor-pointer"
        >
          Save Note
        </Button>
      </div>
    </div>
  );
}
