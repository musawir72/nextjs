import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
   
  ],

  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn(userDetail) {
      if (Object.keys(userDetail).length === 0) {
        return false;
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/protected`;
    },
  },
 
});

export { handler as GET, handler as POST };
