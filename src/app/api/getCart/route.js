import { getCustomSession } from '../sessionCode'
import emailjs from '@emailjs/nodejs'

export async function GET(req, res) {

    // Make a note we are on
    // the GETCART api. This goes to the console.

    console.log("in the getCart api page")

    // =================================================

    const { MongoClient } = require('mongodb');
    const url = 'process.env.DB_ADDRESS';
    const client = new MongoClient(url);
    const dbName = 'KrispyKreme'; // database name
    await client.connect();
    console.log('Connected successfully to server');

    const session = await getCustomSession();
    const username = session.email;
    console.log("The Current User is: ", username);

    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // collection name
    const findResult = await collection.find({username: username}).toArray();
    console.log('Found documents =>', findResult);
    client.close()
    //==========================================================s
    // at the end of the process we need to send something back.

    return Response.json(findResult)

}