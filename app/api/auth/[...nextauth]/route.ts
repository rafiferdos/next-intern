import { EmailProvider } from './../../../../node_modules/next-auth/src/providers/email';
import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import Facebook from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
    }),
    EmailProvider({
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        },
        from: process.env.EMAIL_FROM,
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)