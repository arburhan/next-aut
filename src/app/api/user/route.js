import User from "@/models/user";
import connectDB from "../../../../utils/connectDB";
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs';


export async function GET() {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({ users });

}

export async function POST(request) {
    const { name, email, password } = await request.json();
    await connectDB();
    // check exist user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(422).json({
        message: "user already exists"
    })
    // hash password
    await User.create({ name, email, password: await hash(password, 12) });
    return NextResponse.json({ status: 201 }, { message: "registered successfully" })
}