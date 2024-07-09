import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";


export async function POST(request: Request) {
    const requestData = await request.json()

    const { data }: { data: any, error: any } = await supabase
        .from("users")
        .select("email")
        .eq("email", requestData.email)
        .single()

    return NextResponse.json({
        emailAvailable: !(data?.email === requestData.email)
    });

}