import dynamoDb from '../../../lib/mongo-helper'
import emailHelper from '../../../lib/email-helper'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  await dynamoDb.connectDb()
  const { email } = req.body
  const result = await dynamoDb.getUserByEmail(email)

  if (result.length) {
    const expires = new Date()
    expires.setHours(expires.getHours() + 1);
    const update = {
      reset_link: uuidv4(),
      reset_expires: expires.toISOString(),
    }
    await dynamoDb.updateUserByEmail({ email, update })

    await emailHelper.sendEmail({ to: email })

    res.status(200).json()
  } else {
    res.status(404).json()
  }
}
