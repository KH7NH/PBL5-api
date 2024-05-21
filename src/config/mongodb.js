/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDataBaseInstance = null

// Khởi tạo đối tượng mongoClientInstance để connect tới Mongo
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// Connect to Database
export const CONNECT_DB = async () => {
  // Call connect to MongoDB Atlas with URI declared in body to ClientInstance
  await mongoClientInstance.connect()
  //If the connection is successful, the database will be retrieved by the reverse assigned name
  trelloDataBaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
// Đóng kết nối tới Database
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
//Get DB
export const GET_DB = () => {
  if (!trelloDataBaseInstance) throw new Error('Must connect to Database first')
  return trelloDataBaseInstance
}

