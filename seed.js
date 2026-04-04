const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.production' });
const data = require('./db.json');

async function seed() {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('electronic-shops');

    await db.collection('brands').deleteMany({});
    await db.collection('brands').insertMany(data.brands);
    console.log('✅ Brands seeded:', data.brands.length);

    await db.collection('categories').deleteMany({});
    await db.collection('categories').insertMany(data.categories);
    console.log('✅ Categories seeded:', data.categories.length);

    await client.close();
    console.log('✅ Done!');
}

seed().catch(console.error);