import dynamoDb from '../../../lib/mongo-helper'

export default async function handler(req, res) {
  await dynamoDb.connectDb()
  const result = await dynamoDb.getUserByEmail(req.body.email)

  if (result.length) {
    res.status(409).json({ error: 'Email exists' })
  } else {
    await dynamoDb.createUser(req.body)
    await dynamoDb.disconnectDb()

    res.status(200).json({ email: req.body.email })
  }
}
