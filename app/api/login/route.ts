import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/client";
import { verifyPassword, login } from "@/helper/authentication";

export async function POST(request: NextRequest) {
    const requestData = await request.json();

    const { data } = await supabase
       .from("users")
       .select("password")
       .eq("email", requestData.email)
       .single();

    const success = verifyPassword(requestData.password, data?.password);
    if (success) await login(requestData);
    
    return NextResponse.json({
        success: success
    });
}