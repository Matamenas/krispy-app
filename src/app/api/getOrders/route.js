export async function GET(req, res) {

    // Make a note we are on

    // the api. This goes to the console.

    console.log("in the getProducts api page")

    // =================================================

    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://b00149694:AdFSCKDDixpyPWZI@krispykremedb.hwsne.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeDB';
    const client = new MongoClient(url);
    const dbName = 'KrispyKreme'; // database name
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('orders'); // collection name
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    client.close()
    //==========================================================s
    // at the end of the process we need to send something back.

    return Response.json(findResult)

}