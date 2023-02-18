import mongoose from 'mongoose';
import Config from '../config/Config';

class MongoDB {
  connection: any;
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      mongoose.Promise = global.Promise;
      await mongoose.connect(Config.MONGODB_URL);
      this.connection = mongoose.connection;
      console.log('MongoDB connection has been established');
    } catch (error) {
      console.error('Unable to connect to the database', error);
      throw error;
    }
  }

  async init() {
    try {
      if (!this.connection) await this.connect();
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  }

  async getConnection() {
    try {
      await this.init();
      return this.connection;
    } catch (error) {
      console.error('Error: ', error);
      process.exit(1);
    }
  }
}

const DBService = new MongoDB();
export default DBService;
