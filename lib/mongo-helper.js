import { MongoClient, ServerApiVersion } from 'mongodb'
import bcrypt from 'bcrypt'

const saltRounds = parseInt(process.env.MONGODB_USER, 10)
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.pvksgyh.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

const connectDb = () => client.connect()
const disconnectDb = () => client.close()
const getUserByEmail = async email => {
  let result

  try {
    const db = client.db('modest')
    const collection = db.collection('users')

    result = await collection.find({ email }).toArray()
  } catch (e) {
    console.log('error on getting user', e)
  }

  return result
}

const createUser = async ({ email, password }) => {
  let result

  try {
    const hash = await bcrypt.hash(password, saltRounds)
    const db = client.db('modest')
    const collection = db.collection('users')
    const newUser = { email, password: hash }

    result = await collection.insertOne(newUser)
  } catch (e) {
    console.log('error on creating user', e)
  }

  return result
}


const mongoHelper = {
  connectDb,
  disconnectDb,
  getUserByEmail,
  createUser,
}

export default mongoHelper


// https://www.mongodb.com/languages/mongodb-with-nodejs
