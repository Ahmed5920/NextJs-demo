import { MongoClient } from "mongodb";

const handler = async(req,res) =>{
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://AhmedMagdy:4tzvVzDGOJljERBC@cluster0.z2sbz4w.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message:'meetups inserted'});
    }
}

export default handler