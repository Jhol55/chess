import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";


export async function POST(request: Request) {

  const { email, validationCode } = await request.json();

  const { error } = await supabase
    .from('users')
    .update({ confirmed: true })
    .eq("email", email)
    .eq("validationCode", validationCode);

  return NextResponse.json({
    error: error
  });
};

