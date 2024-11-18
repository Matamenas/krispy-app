import { MongoClient } from 'mongodb';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const accType = "customer"; // Enforce account type on the server

    const url = 'mongodb+srv://b00149694:AdFSCKDDixpyPWZI@krispykremedb.hwsne.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeDB';
    const client = new MongoClient(url);

    await client.connect();
    const db = client.db('KrispyKreme');
    const collection = db.collection('login');

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, message: "User already exists" }), { status: 400 });
    }

    // Insert new user
    await collection.insertOne({ email, password, accType });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
