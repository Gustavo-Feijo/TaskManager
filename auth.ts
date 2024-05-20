import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

// Prisma client
const prisma = new PrismaClient();

// Zod schema for validating credentials.
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //Crentials authentication.
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          //Verify if the email and password match the signInSchema from Zod.
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          //Get the email from the database with prisma.
          user = await prisma.user.findUnique({ where: { email: email } });
          if (!user) {
            return null;
          }
          //If the user exists, compare it's hashed password with the plaint text password.
          if (await bcrypt.compare(password, user.password)) {
            //If it matches, then the right password was inserted.
            //Removes the password from the response and returns the user object.
            const { password, ...cleanUser } = user;
            return cleanUser;
          } else {
            return null;
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    // Callbacks to add the user id to the jwt, then add it to the session user.
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.id == "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
