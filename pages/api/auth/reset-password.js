import bcrypt from 'bcrypt'
import dynamoDb from '../../../lib/mongo-helper'

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)

export default async function handler(req, res) {
  await dynamoDb.connectDb()
  const { password, token } = req.body

  if (password && token) {
    try {
      const [user] = await dynamoDb.getUserByQuery({ reset_token: token })
      const now = new Date()

      if (!!user && new Date(user.reset_expires) > now) {
        const hash = await bcrypt.hash(password, saltRounds)
        const update = {
          password: hash,
          reset_token: null,
          reset_expires: null,
        }
        await dynamoDb.updateUserByEmail({ email: user.email, update })
        res.status(200).json()
      } else {
        res.status(404).json()
      }
    } catch (err) {
      console.error('Unexpected error on password reset', err)
      res.status(500).json()
    }
  } else {
    res.status(404).json()
  }
}
