import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Define the saltAndHashPassword function
function saltAndHashPassword(password: string): string {
  // Implement your salting and hashing logic here
  return password; // Replace this with actual hashing logic
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null
   
          // logic to salt and hash password
          if (!credentials) {
            throw new Error("Credentials are missing.");
          }
          const pwHash = saltAndHashPassword(credentials.password);
   
          // logic to verify if the user exists
          user = await getUserFromDb(credentials.email, pwHash);
   
          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.")
          }
   
          // return user object with their profile data
          return user
        },
      }),
  ],
//   pages: {
//     signIn: "/login",
//   },
  secret: process.env.NEXTAUTH_SECRET,
};