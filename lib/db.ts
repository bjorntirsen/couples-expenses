import { MongoClient, ConnectOptions } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.DB_URI!, {
    useUnifiedTopology: true,
  } as ConnectOptions );
  return client;
};
