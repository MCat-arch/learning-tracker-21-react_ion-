import clientPromise from "@/utils/db";
import { NextResponse } from "next/server";

// Dynamic route handler for `/notes/[id]`
export async function GET(req, { params }) {
  try {
    const { id } = params; // Extract `id` from the dynamic route params

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("notes");
    const notesCollection = db.collection("NotesData");

    // Fetch the specific note by ID
    const note = await notesCollection.findOne({ id: parseInt(id) });

    if (note) {
      return NextResponse.json(note, { status: 200 });
    } else {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Extract the dynamic route parameter `id`

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("notes");
    const notesCollection = db.collection("NotesData");

    // Attempt to delete the note with the given ID
    const result = await notesCollection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

