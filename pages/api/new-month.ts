import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../lib/db';
import { ObjectId } from 'mongodb';
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
  }

  interface Session {
    user: User;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'This route is only for post requests!' });
    return;
  }

  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
  }

  try {
    const data = req.body;
    const userId = session!.user.id;
    const client = await connectToDatabase();
    const db = client.db();
    const monthsCollection = db.collection('months');

    data['createdBy'] = new ObjectId(userId);

    const result = await monthsCollection.insertOne(data);
    client.close();

    res.status(201).json({ message: 'Month inserted!', result });
  } catch (err: any) {
    res.status(400).json({ error: err, errorMessage: err.message });
  }
};

export default handler;
