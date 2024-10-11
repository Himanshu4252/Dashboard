"use server";
import { connectToDb } from "@/lib/utils";
import  { User } from "@/lib/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


connectToDb();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({error:"user does not exist"}, {status: 400});
        }

        const validPassword =  await bcrypt.compare( password, user.password);
        console.log(validPassword);
        if(!validPassword){
            console.log("password check failed..");
            return NextResponse.json({error:"Passwords is not correct"}, {status: 400});
        }
        //creating token data 
        const tokenData ={
            _id: user._id,
            username: user.userName,
            email: user.email,
        }
        //creating token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "12h" })
        const response = NextResponse.json({message:"login Successfull", success: true})
        response.cookies.set("token", token, {httpOnly:true})
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
