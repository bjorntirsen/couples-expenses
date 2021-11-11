import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const data = req.body;
      const client = await MongoClient.connect(process.env.DB_URI!);
      const db = client.db();
      const monthsCollection = db.collection('months');
      const result = await monthsCollection.insertOne(data);
      console.log(result);
      client.close();

      res.status(201).json({ message: 'Month inserted!' });
    }
  } catch (err: any) {
    res.status(400).json({ error: err, errorMessage: err.message });
  }
};

export default handler;
