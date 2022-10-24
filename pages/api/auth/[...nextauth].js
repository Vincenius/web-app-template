import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import dynamoDb from '../../../lib/mongo-helper'
// https://next-auth.js.org/providers/credentials

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "E-Mail", type: "text", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await dynamoDb.connectDb()
        const [user] = await dynamoDb.getUserByQuery({ email: req.body.username })
        await dynamoDb.disconnectDb()

        if (user) {
          const isCorrectPass = bcrypt.compareSync(req.body.password, user.password)
          if (isCorrectPass) {
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
}

export default NextAuth(authOptions)