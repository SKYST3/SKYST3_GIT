import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT as string),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: false,
});

const providers = [Naver];

export const providerMap = providers.map((provider) => {
  const providerData = provider({});

  return { id: providerData.id, name: providerData.name };
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  adapter: PostgresAdapter(pool),
  providers: providers,
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      return session;
    },
  },
});
