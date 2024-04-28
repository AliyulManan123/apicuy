import { MongoClient } from 'mongodb';
import { JSONFile, Low } from '@xyzendev/lowdb';
import _ from 'lodash';
import fs from 'fs/promises';
import yargs from 'yargs/yargs';

const MONGO_URL = 'mongodb+srv://xyzenapis:xyzen@cluster0.0uplkml.mongodb.net/';

// Initialize opts and db
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.db = new Low(new JSONFile('src/database/database.json'));

// Initialize DATABASE and loadDatabase
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) =>
      setInterval(function () {
        !global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null;
      }, 1 * 1000)
    );
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    ...(global.db.data || {}),
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();

// Schedule periodic write to the database
if (global.db) {
  setInterval(async () => {
    if (global.db.data) {
      const dataFilePath = 'src/database/database.json';
      try {
        const jsonData = JSON.stringify(global.db.data, null, 2);
        await fs.writeFile(dataFilePath, jsonData);
      } catch (error) {
        console.error('Error writing data:', error);
        throw error;
      }
    }
  }, 30 * 1000);
}

/*
if (global.db) {
  setInterval(async () => {
    if (global.db.data) {
      try {
        const client = new MongoClient(MONGO_URL, { useUnifiedTopology: false });
        await client.connect();

        const database = client.db();
        const collection = database.collection('xyzenapis'); 

        const jsonData = JSON.stringify(global.db.data, null, 2);
        const parsedData = JSON.parse(jsonData); // Parsing here to ensure it's valid JSON
        await collection.updateOne({}, { $set: { data: parsedData } }, { upsert: true });

        await client.close();
      } catch (error) {
        console.error('Error writing data to MongoDB:', error);
        throw error;
      }
    }
  }, 30 * 1000);
}
*/

export default global.db;
