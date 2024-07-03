import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {isConnected , connectToDB} from '@utils/database';
import User from "@models/user";

// console.log({
//   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: profile.email
        });

        if (!userExists){
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture
          })
        }

        return true;
      } catch (error) {
        console.log(error);
      }
    },
    "botato": () => {},

  }
});

export {handler as GET, handler as POST};