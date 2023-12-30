// import { User, signInWithEmailAndPassword } from "firebase/auth";
// import { NextAuthOptions, Session } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { auth } from "@/app/lib/firebase/config";
// import { JWT } from "next-auth/jwt";

// export const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials): Promise<any> {
//         return await signInWithEmailAndPassword(
//           auth,
//           (credentials as any).email || "",
//           (credentials as any).password || ""
//         )
//           .then(async (userCredentials) => {
//             if (userCredentials) {
//               return {
//                 email: userCredentials.user.email,
//                 accessToken: await userCredentials.user.getIdToken(),
//                 uid: userCredentials.user.uid,
//               };
//             }
//             return null;
//           })
//           .catch((error) => console.log(error));
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ user, token }: { user: any; token: JWT }) {
//       //   update token if user is returned
//       if (user) {
//         token.email = user.email;
//         token.accessToken = user.accessToken;
//         token.uid = user.uid;
//       }
//       //   return final_token
//       return token;
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       //  update session from token
//       session.email = token.email;
//       session.accessToken = token.accessToken;
//       session.uid = token.uid;
//       return session;
//     },
//   },
// };
