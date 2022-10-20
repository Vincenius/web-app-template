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
        console.log('YO')
        const [result] = await dynamoDb.getUserByEmail(req.body.username)
        await dynamoDb.disconnectDb()
        console.log('YOYO')

        if (result) {
          const isCorrectPass = bcrypt.compareSync(req.body.password, result.password)
          if (isCorrectPass) {
            return result
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