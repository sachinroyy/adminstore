import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// For development and production URLs
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction 
  ? 'https://storeiiiii.netlify.app' 
  : 'http://localhost:3000';

const handler = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: 'openid email profile',
        },
      },
      // Explicitly set the callback URL
      callbackUrl: `${baseUrl}/api/auth/callback/google`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.email = token.email; // Ensure email is in session
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: account.access_token,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/pages/signin",
    error: "/pages/signin",
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
