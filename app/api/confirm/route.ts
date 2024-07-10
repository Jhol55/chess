import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/client";

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const { data } = await supabase
    .from('users')
    .update({ confirmed: true })
    .eq("email", requestData.email)
    .eq("validationCode", requestData.validationCode)
    .select("email");

  return NextResponse.json({
    success: !!data?.length
  });
};

