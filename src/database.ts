import config from './config/config';
import mongoose from "mongoose";
const MONGODB_URI = config.DB.URI+config.DB.USER+config.DB.PASSWORD+config.DB.CLUSTER
//const MONGODB_URI = `mongodb+srv://carlos:qjBYSGiqm5LEiaLQ@dbculqi.u95yuqk.mongodb.net/test`

mongoose.connect(MONGODB_URI);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb Connection stablished');
});

connection.on('error', (err) => {
  console.log('Mongodb connection error:', err);
  process.exit();
});