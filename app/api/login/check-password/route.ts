
import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";
import { verifyPassword } from "@/helper/authentication";


export async function POST(request: Request) {

    const requestData = await request.json();

    const { data } = await supabase
       .from("users")
       .select("password")
       .eq("email", requestData.email)
       .single()

    return NextResponse.json({
        success: verifyPassword(requestData.password, data?.password)
    });
    

}