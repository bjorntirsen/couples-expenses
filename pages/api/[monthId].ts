import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const monthId: any = req.query.monthId;
    if (req.method === 'PUT') {
      const data = req.body;
      const client = await MongoClient.connect(process.env.DB_URI!);
      const db = client.db();
      const monthsCollection = db.collection('months');
      const result = await monthsCollection.replaceOne(
        { _id: new ObjectId(monthId) },
        data,
        {
          upsert: true,
        }
      );
      console.log(result);
      client.close();

      res.status(201).json({ message: 'Month updated!' });
    }
  } catch (err: any) {
    res.status(400).json({ error: err, errorMessage: err.message });
  }
};

export default handler;
