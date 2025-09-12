import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import connection from "../DB/route";
import User from "../Schema/Accounts/route";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connection();
          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (passwordsMatch) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
            };
          }

          return null;
        } catch (error) {
          console.error("Error in authorize: ", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connection();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            await new User({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "google",
            }).save();
          }
          return true;
        } catch (error) {
          console.error("Error saving user: ", error);
          return false;
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
