import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";



export async function POST(request: Request) {

    const requestData = await request.json();

    const { data } : { data: any } = await supabase
        .from("users")
        .select("validationCode")
        .eq("email", requestData.email)
        .single()

    return NextResponse.json({
        validationCode: data.validationCode     
    });

}