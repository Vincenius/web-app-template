import dynamoDb from '../../../lib/mongo-helper'
import emailHelper from '../../../lib/email-helper'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  await dynamoDb.connectDb()
  const { email } = req.body
  const [user] = await dynamoDb.getUserByQuery({ email })

  if (user) {
    const expires = new Date()
    const token = uuidv4()
    expires.setHours(expires.getHours() + 1);
    const update = {
      reset_token: token,
      reset_expires: expires.toISOString(),
    }

    try {
      await dynamoDb.updateUserByEmail({ email, update })
      await emailHelper.sendEmail({ to: email, token })
      res.status(200).json()
    } catch (err) {
      console.err('unexpected error', err)
      res.status(500).json()
    }
  } else {
    res.status(404).json()
  }
}
