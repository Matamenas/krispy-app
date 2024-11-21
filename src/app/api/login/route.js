import { MongoClient } from 'mongodb';

export async function GET(req) {
  console.log("In the login API page");

  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('username')?.trim();
  const pass = searchParams.get('password')?.trim();
  const acc_type = searchParams.get('acc_type')?.trim();

  console.log("Received inputs after trimming:", { email, pass, acc_type });

  // Database connection
  const url = 'mongodb+srv://b00149694:AdFSCKDDixpyPWZI@krispykremedb.hwsne.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeDB';
  const client = new MongoClient(url);

  const dbName = 'KrispyKreme';
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('login');
  
  // Query the database
  const findResult = await collection.find({
    username: email,
    password: pass,
    acc_type: acc_type
  }).toArray();

  console.log('Found documents =>', findResult);
  
  let valid = false;
  if (findResult.length > 0) {
    valid = true;
    console.log("Login valid");
  } else {
    valid = false;
    console.log("Login invalid");
  }

  const user = findResult[0];  // Use the first user from the result, if found

  if (user) {
    console.log("Login Valid 2.0");

    // You are still using session in your API, which doesn't seem to be relevant anymore as per your request.
    // Removing session logic
    const redirectUrl = acc_type === 'manager' ? '/manager' : '/customer';

    // Send response
    try {
      return new Response(
        JSON.stringify({ success: true, redirectUrl: redirectUrl }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in login API:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }

  // If user not found or invalid credentials
  return new Response(
    JSON.stringify({ success: false, message: "Invalid credentials" }),
    { status: 401 }
  );
}
