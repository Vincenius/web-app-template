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
    const newUser = { email, password: hash } // TODO set defaults

    result = await collection.insertOne(newUser)
  } catch (e) {
    console.log('error on creating user', e)
  }

  return result
}

const updateUserByEmail = async ({ email, update }) => {
  let result

  try {
    const db = client.db('modest')
    const collection = db.collection('users')

    result = await collection.findOneAndUpdate({ email }, { $set: update },)
  } catch (e) {
    console.log('error on updating user', e)
  }

  return result
}


const mongoHelper = {
  connectDb,
  disconnectDb,
  getUserByEmail,
  createUser,
  updateUserByEmail,
}

export default mongoHelper
