import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../utils/connectDB";
import { compare } from "bcryptjs";
import User from "@/models/user";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                await connectDB();
                const email = credentials.email;
                const password = credentials.password;
                const user = await User.findOne({ email });
                console.log(user);

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return signInUser({ password, user })
                } else {
                    throw new Error("You haven't create a account")

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        newUser: '/auth/register'
    },
    secret: "secret"
})

const signInUser = async ({ password, user }) => {
    if (!user.password) {
        throw new Error("Please enter passowrd")
    }
    const isMatch = await compare(password, user);
    if (isMatch) {
        throw new Error("Password is not correct");
    }
    return user;
}