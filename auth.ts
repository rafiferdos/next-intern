import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        let user = null;

        user = {
          id: "1",
          name: "John Doe",
          email: "rafi@gmail.com",
        };
        if (!user) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
});
