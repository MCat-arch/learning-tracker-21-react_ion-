import clientPromise from '@/utils/db';
import { NextResponse } from 'next/server';
import {date, z} from 'zod';

const noteSchema = z.object({
  id: z.number().nonnegative("ID must be a non-negative number."),
  title: z.string().nonempty("Title requaired!"),
  content: z.string().nonempty("Content requaired!"),
  category: z.enum(["material", 'random']),
  date: z.string().regex(   
     /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    "Date must be a valid ISO string."
)
});

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('notes');
  const notesCollection = db.collection('NotesData');

  try{
    const body = await req.json();
    const validatedData = noteSchema.parse(body);

    //insert to db
    const newNote = await notesCollection.insertOne(validatedData);
    return NextResponse.json(newNote, { status: 201 });
  }catch{
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db('notes');
  const notesCollection = db.collection('NotesData');
  const notes = await notesCollection.find({}).toArray();
  return NextResponse.json(notes);
}
/*
export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('notes');
  const notesCollection = db.collection('NotesData');
  const { title, content, category, date } = await req.json();
  const newNote = await notesCollection.insertOne({
    title,
    content,
    category,
    date,
  });
  return NextResponse.json(newNote, { status: 201 });
}
*/