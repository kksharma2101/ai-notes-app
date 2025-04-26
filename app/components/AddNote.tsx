"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNote } from "@/hooks/useCreateNote";
import { useSummarize } from "@/hooks/useSummarize";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddNot() {
  const [note, setNote] = useState("");
  const { mutate: summarize, data: summary, isPending } = useSummarize();
  const { mutate: createNote } = useCreateNote();

  const router = useRouter();

  const handleSave = () => {
    createNote(note);
    // setNote("");
    router.push("/notes");
  };

  const handleSummary = () => {
    createNote(summary);
    router.push("/notes");
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 my-4">
      <Textarea
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[150px]"
      />
      <div className="flex gap-2">
        <Button
          onClick={() => summarize(note)}
          disabled={isPending}
          className="cursor-pointer"
        >
          {isPending ? "Summarizing..." : "Summarize"}
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
          className="cursor-pointer"
        >
          Save Note
        </Button>
      </div>
      {summary && (
        <>
          <div className="mt-4 p-4 rounded bg-gray-100 border">
            <h3 className="font-semibold">Summary:</h3>
            <p>{summary}</p>
          </div>
          <Button onClick={handleSummary} className="cursor-pointer">
            Save Summary
          </Button>
        </>
      )}
    </div>
  );
}
