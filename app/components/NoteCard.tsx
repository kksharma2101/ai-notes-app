// components/NoteCard.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { createClient } from "@/hooks/useSupabase";
import { Note } from "@/lib/types";
import { Pencil, Trash2, Bookmark, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NoteCardProps {
  note: Note;
  // onDelete?: (id: string) => void;
  // onEdit?: (id: string) => void;
}

export function NoteCard() {
  const [notes, setNotes] = useState<Note[]>([]);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchNotes() {
      const { data: res, error } = await supabase.from("note").select("*");
      if (error) {
        console.log("Error in fetching Notes", error);
      } else {
        setNotes(res);
      }
    }
    fetchNotes();
  }, [supabase]);

  const handleDelete = async (id: any) => {
    try {
      const { error } = await supabase.from("note").delete().eq("id", id);
      if (error) console.log("error in delete", error);
      router.refresh();
    } catch (error) {
      console.log("Error in delete function", error);
    }
  };

  const handleEdit = async (id: any) => {
    try {
      const { error } = await supabase
        .from("notes")
        .update({
          //  content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
    } catch (error) {
      console.log("Error in edit note", error);
    }
  };

  return (
    <>
      {notes.map((note) => (
        <Card
          className="hover:shadow-lg transition-shadow duration-200 my-2 "
          key={note?.id}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-sm">
                  {new Date(note.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-gray-700 line-clamp-3">Your Summary</p>
            {note.content && (
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-800 font-medium">Summary</p>
                <p className="text-sm text-blue-700">{note.content}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(note?.id)}
                className="cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
