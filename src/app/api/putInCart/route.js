export async function GET(req, res){

    // We are on putInCart api page
    console.log("in the putInCart api page")

    // get the values
    const { searchParams } = new URL(req.url)
    const pname = searchParams.get('pname')

    console.log(pname);

    // <-------------------------------------->
    //             Database call

    const { MongoClient } = require('mongodb');

    const url = 'mongodb+srv://b00149694:AdFSCKDDixpyPWZI@krispykremedb.hwsne.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKremeDB';
    const client = new MongoClient(url);

    const dbName = 'KrispyKreme'; // DB NAME

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // collection name

    var myobj = { pname: pname, username: "sample@test.com"};
    const insertResult = await collection.insertOne(myobj);

    // at the end of the process we need to send something back
    return Response.json({"data":"" + "inserted" + ""})
}