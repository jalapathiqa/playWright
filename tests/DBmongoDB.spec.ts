import { test, expect } from '@playwright/test';
import { MongoClient } from 'mongodb';

let client: MongoClient;
let db: any;

test.beforeAll(async () => {
    // defualt local connection string
    const uri = 'mongodb://localhost:27017';
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('test_database');
})

test.afterAll(async () => {
    await client.close();
})

test('MongoDB Connection', async ({ page }) => {
    const collection = db.collection('users');
    const user = await collection.findOne({ username: 'testuser' });
    // expect(user).toEqual({ username: 'testuser' });
    expect(user).not.toBeNull();

})