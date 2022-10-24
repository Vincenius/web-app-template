import dynamoDb from '../../../lib/mongo-helper'

export default async function handler(req, res) {
  await dynamoDb.connectDb()
  const [user] = await dynamoDb.getUserByQuery({ email: req.body.email })

  if (user) {
    res.status(409).json({ error: 'Email exists' })
  } else {
    await dynamoDb.createUser(req.body)
    await dynamoDb.disconnectDb()

    res.status(200).json({ email: req.body.email })
  }
}
