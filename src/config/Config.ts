import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.SERVER_PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const MONGODB_URL = process.env.MONGODB_URL || '';

const Config = {
  PORT,
  HOSTNAME,
  MONGODB_URL
};

export default Config;
