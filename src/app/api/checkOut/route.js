import { getCustomSession } from '../sessionCode';

export async function GET(req, res){

    const session = await getCustomSession();

    // We are on Checkout api page
    console.log("in the checkOut api page");

    // get the values
    const { searchParams } = new URL(req.url)
    const totalPrice = parseFloat(searchParams.get('totalPrice'));
    const itemCount = parseFloat(searchParams.get('itemCount'), 10);

    console.log('Total Price: ', totalPrice);
    console.log('Item Count: ', itemCount);
    // <-------------------------------------->
    //             Database call

    const { MongoClient } = require('mongodb');

    const url = 'mongodb+srv://b00149694:AdFSCKDDixpyPWZI@krispykremedb.hwsne.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeDB';
    const client = new MongoClient(url);

    const dbName = 'KrispyKreme'; // DB NAME

    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('orders'); // collection name

    const myobj = {itemCount: itemCount, totalPrice: totalPrice, username: session.email, Timestamp: new Date()};
    await collection.insertOne(myobj);
    console.log('Order Confirmed: ', myobj);

    // at the end of the process we need to send something back
    return Response.json({"data":"" + "inserted" + ""})
}