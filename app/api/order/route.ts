import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoUri = process.env.MONGODB_URI!;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

export async function POST(request: NextRequest) {
  console.log("Connecting to MongoDB...");

  const client = new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    const body = await request.json();
    console.log("Request Body:", JSON.stringify(body, null, 2));

    await client.connect();
    console.log("MongoDB Connected!");

    const db = client.db("orderdb");
    const collection = db.collection("order");

    const result = await collection.insertOne(body);
    console.log("Inserted Document:", result);

    return NextResponse.json({
      message: "Payment data saved successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error while saving payment data:", error);
    return NextResponse.json({ error: "Failed to save payment data" }, { status: 500 });
  } finally {
    await client.close();
  }
}
