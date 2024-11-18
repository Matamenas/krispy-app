export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the login api page")

    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('username')
    const pass = searchParams.get('pass')
    const acc_type = searchParams.get('acc_type')

    console.log(email);
    console.log(pass);
    console.log(acc_type);

    // database call goes here
    const { MongoClient } = require ('mongodb');

    const url = 'mongodb+srv://b00149694:AdFSCKDDixpyPWZI@krispykremedb.hwsne.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeDB';
    const client = new MongoClient(url);

    const dbName = 'KrispyKreme'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('login');

    const findResult = await collection.find({"username": email, "pass": pass, "acc_type": acc_type }).toArray();

    console.log('Found documents =>', findResult);
    let valid = false;
    if(findResult.length > 0){
        valid = true;
        console.log("login valid")
    } else {
        valid = false;
        console.log("login invalid");
    }

    
    // at the end of the process we need to send something back.
    return Response.json({ "data" : valid })
}