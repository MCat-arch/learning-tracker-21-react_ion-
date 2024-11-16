import clientPromise from "@/utils/db";
import { NextResponse } from "next/server";

const collectionName = "sourcesData"; // Unified collection

// POST: Add a new type or resource
export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("notes");
  const sourcesCollection = db.collection(collectionName);

  try {
    const { type, title, link, category } = await req.json();

    if (category === "type") {
      // Adding a new type
      if (!type) {
        return NextResponse.json({ error: "Type is required!" }, { status: 400 });
      }

      // Check if type already exists
      const existingType = await sourcesCollection.findOne({ type });
      if (existingType) {
        return NextResponse.json({ error: "Type already exists!" }, { status: 400 });
      }

      // Insert new type with an empty resources array
      const result = await sourcesCollection.insertOne({ type, resources: [] });
      return NextResponse.json(result.ops[0], { status: 201 });
    } else if (category === "resource") {
      // Adding a new resource to an existing type
      if (!type || !title || !link) {
        return NextResponse.json({ error: "Type, title, and link are required!" }, { status: 400 });
      }

      // Find the type and update its resources array
      const result = await sourcesCollection.updateOne(
        { type },
        { $push: { resources: { id: new Date().getTime().toString(), title, link } } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Type not found!" }, { status: 404 });
      }

      return NextResponse.json({ message: "Resource added successfully!" }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid category!" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch types or resources
export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("notes");
  const sourcesCollection = db.collection(collectionName);

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type) {
      // Fetch resources for a specific type
      const data = await sourcesCollection.findOne({ type }, { projection: { resources: 1 } });

      if (!data) {
        return NextResponse.json({ error: "Type not found!" }, { status: 404 });
      }

      return NextResponse.json(data.resources, { status: 200 });
    } else {
      // Fetch all types
      const types = await sourcesCollection.find({}, { projection: { type: 1 } }).toArray();
      return NextResponse.json(types, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
