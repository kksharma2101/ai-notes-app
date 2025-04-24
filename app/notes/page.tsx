import React from "react";
import { NoteCard } from "../components/NoteCard";
import AddNot from "../components/AddNote";

export default function page() {
  return (
    <div>
      <AddNot />
      <NoteCard />
    </div>
  );
}
