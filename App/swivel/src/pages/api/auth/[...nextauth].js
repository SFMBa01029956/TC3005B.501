import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {User, SellerUser} from "../../../models/user";
import bcrypt from "bcryptjs";
import dbConnect from "../../../config/dbConnect";
import { json } from "body-parser";

const { decryptRole } = require("../../../utils/crypto");

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const pass = {...user}._doc.password

        console.log(credentials.password,  pass);
        
        const isPasswordMatched = await bcrypt.compare(
          credentials.password,
          pass
          );
          
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: decryptRole({...user}._doc.encrypted_role),
        };
      },
    }),
  ],

  pages: {
    signIn: "../../auth/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // You can store the user's role in the token
      }
      return token;
    },

    async session({ session, token }) {
      session.id = token.id;
      session.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
