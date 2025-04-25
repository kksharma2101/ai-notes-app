import React from "react";
import { NoteCard } from "../components/NoteCard";
import Link from "next/link";
// import AddNot from "../components/AddNote";

export default function page() {
  return (
    <div className="pt-5 ">
      {/* <AddNot /> */}
      <div className="w-full flex justify-center">
        <Link
          href={"/notes/add-note"}
          className="px-2 py-1 bg-black text-white rounded-md items-center"
        >
          Add New Note
        </Link>
      </div>

      <NoteCard />
    </div>
  );
}
