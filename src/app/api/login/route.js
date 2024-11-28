import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode';

export async function GET(req) {
  const session = await getCustomSession();
  console.log('In the login API page');

  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('username')?.trim();
  const pass = searchParams.get('password')?.trim();
  const acc_type = searchParams.get('acc_type')?.trim();

  console.log('Received inputs after trimming:', { email, pass, acc_type });

  // Database connection
  const url = 'mongodb+srv://b00149694:AdFSCKDDixpyPWZI@krispykremedb.hwsne.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeDB';
  const client = new MongoClient(url);
  const dbName = 'KrispyKreme';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('login');
  
  // Query the database
  const findResult = await collection.findOne({
    username: email,
    password: pass,
    acc_type: acc_type,
  });

  if (findResult) {
    console.log('Login valid');
    // Save user information in the session
    session.acc_type = acc_type;
    session.email = email;
    await session.save();

    // Redirect based on account type
    const redirectUrl = acc_type === 'manager' ? '/manager' : '/customer';

    return new Response(
      JSON.stringify({ success: true, redirectUrl }),
      { status: 200 }
    );
  } else {
    console.log('Login invalid');
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid credentials' }),
      { status: 401 }
    );
  }
}
