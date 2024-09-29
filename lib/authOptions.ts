import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { CredentialsProvider } from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'

export const authOptions: NextAuthOptions = ({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) : Promise<any> {
                await dbConnect();
                try {

                }
                catch (err : any) {
                    throw new Error(err)
                }
            }
        })
    ]
})