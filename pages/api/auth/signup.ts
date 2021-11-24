import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const { email, name, password } = data;
  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim().length < 3 ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid input - password should be at least 7 characters long.',
    });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User already exixts!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  const result = await db
    .collection('users')
    .insertOne({ email, name, password: hashedPassword });
  res.status(201).json({ message: 'Created user!', result });
  client.close();
};

export default handler;
