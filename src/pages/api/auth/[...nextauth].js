import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials';
import User from "models/users";
import { initMongoose } from "lib/connectdb";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials:{
          email: {
            label: 'Email Address',
            type: 'email',
            placeholder: 'youremail@gbtechnology.com',
          },
          password: {label: 'Password', type:'password'}
        },
        async authorize(credentials, req) {
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };
          
          const res = await fetch(`http://localhost:3000/api/users/login`,{
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type' : 'application/json',
            },
          });

          const user = await res.json();
          console.log(user);
          if(res.ok && user) {
            return user.authtoken;
          }

          return null;
        },
      }),
      
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      
      FacebookProvider({
        clientId: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
      }),
      // ...add more providers here

    ],
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET
    },
    // callbacks: {
    //   async jwt({ token, account }) {
    //     // Persist the OAuth access_token to the token right after signin
    //     if (account) {
    //       token.accessToken = account.access_token
    //     }
    //     return token
    //   },
    //   async session({ session, token, user }) {
    //     // Send properties to the client, like an access_token from a provider.
    //     session.accessToken = token.accessToken
    //     return session
    //   }
    // }
    callbacks: {
      jwt: async ({ token, user }) => {
        if(user){
          await initMongoose();
          const userfind = await User.find({provider_id : user.id })
          if(!userfind) {
            const usernew = await User.create({ provider_id: user.id, email: user.email, profile_pic: user.image, fullName: user.name, isVerified: true, isActive: true}) 
            token.user = usernew
            return token
          }
          console.log(userfind);
          token.user = userfind
          return token
        }
        // token.user = user;
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;  // Setting token in session
        return session;
      },
    },

  }
  export default NextAuth(authOptions)