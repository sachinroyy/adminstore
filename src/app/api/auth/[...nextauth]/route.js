import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'guest',
      name: 'Guest',
      credentials: {},
      async authorize(credentials, req) {
        // Create a guest user with a random ID
        const guestId = `guest_${Math.random().toString(36).substring(2, 15)}`;
        return {
          id: guestId,
          name: 'Guest User',
          email: `${guestId}@guest.com`,
          isGuest: true,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.sub || token.id;
        session.user.token = token.jti;
        session.user.isGuest = token.isGuest || false;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          id: user.id,
          isGuest: user.isGuest || false,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: user.name,
          email: user.email,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
