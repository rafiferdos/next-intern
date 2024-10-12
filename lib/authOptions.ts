// import GoogleProvider from "next-auth/providers/google";
// import { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import Credentials from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     Credentials({
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize() {
//         let user = null;

//         user = {
//           id: "1",
//           name: "John Doe",
//           email: "rafi@gmail.com",
//         };
//         if (!user) {
//           console.log("Invalid credentials");
//           return null;
//         }
//         return user;
//       },
//     }),
//   ],
// };
