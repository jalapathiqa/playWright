// Mongo connection
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();
export async function fetchTestData(){
    const client = new MongoClient(process.env.MONGO_URI!);
    try{
    await client.connect();
    const db = client.db(process.env.MONGO_DB!);
    const collection = db.collection('test_users');
    const data = await collection.find({}).toArray();
    await client.close();
    return data;
    }catch(error){
        console.log(error);
    }
    finally{
        await client.close();
    }   
}