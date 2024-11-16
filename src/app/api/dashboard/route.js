import clientPromise from "@/utils/db";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema for progress data validation
const progressSchema = z.object({
  date: z.string(), // Storing as ISO string for simplicity
  isAttended: z.boolean(),
});

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("notes");
  const progressCollection = db.collection("progressData");

  try {
    const body = await req.json();
    const validatedData = progressSchema.parse(body);

    const existingEntry = await progressCollection.findOne({ date: validatedData.date });
    if (existingEntry) {
      return NextResponse.json({ message: "Attendance already marked for this date." }, { status: 400 });
    }

    const newProgress = await progressCollection.insertOne(validatedData);
    return NextResponse.json(newProgress.ops[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("notes");
  const progressCollection = db.collection("progressData");

  try {
    const progress = await progressCollection.find().toArray();
    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
