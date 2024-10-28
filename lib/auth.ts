import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/prisma"
import { Adapter } from "next-auth/adapters"
import { AuthOptions } from "next-auth"
import bcrypt from "bcrypt"

declare module "next-auth" {
  interface User {
    id: string
    isBarber: boolean
    barbershopID?: string | null
  }

  interface Session {
    user: User
  }
}

interface SessionUser {
  id: string
  name: string
  email: string
  image?: string | null
  isBarber: boolean
  barbershopID?: string | null
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Senha", type: "password", placeholder: "Senha" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials?.email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isBarber: true,
            barbershopID: true,
            password: true,
          },
        })
        if (!credentials) {
          return null
        }
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image || null,
            isBarber: user.isBarber,
            barbershopID: user.barbershopID || null,
          }
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userTyped = user as SessionUser
        token.id = userTyped.id
        token.name = userTyped.name
        token.email = userTyped.email
        token.image = userTyped.image || null
        token.isBarber = userTyped.isBarber
        token.barbershopID = userTyped.barbershopID || null
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: (token.image as string | null) || null,
          isBarber: token.isBarber as boolean,
          barbershopID: (token.barbershopID as string | null) || null,
        }
      }
      return session
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}
