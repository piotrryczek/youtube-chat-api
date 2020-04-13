import mongoose from 'mongoose';

const connectionUrl = process.env.MONGO_CONNECTION;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

export default mongoose.connection;
