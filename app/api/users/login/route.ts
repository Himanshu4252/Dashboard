"use server";
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";

interface userData{
    email : string;
    password: string
}
export async function POST(request: NextRequest){
    const{ email, password} : userData = await request.json();
    const userD = {
        email : email,
        password : password
    }
    const { data, error } = await supabase.auth.signInWithPassword(userD)

      if(error){
        console.log(error.message);
        return NextResponse.json({message : "log in failed"},  {status: 401});
      }
      return NextResponse.json({message:"logged in successfully",data}, {status: 201});

}
