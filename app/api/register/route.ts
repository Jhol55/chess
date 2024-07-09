import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";
import { ConfirmEmail } from "@/emails/templates/confirmEmail";
import { sendEmail } from "@/helper/sendEmail";
import { generateValidationCode, hashPassword } from "@/helper/authentication";



export async function POST(request: Request) {

  const requestData = await request.json();
  requestData.password = hashPassword(requestData.password);
  delete requestData.repeatPassword;

  const validationCode = generateValidationCode();
  
  const { error } = await supabase
    .from("users")
    .insert({ 
      ...requestData, 
      validationCode: validationCode 
  });

  await sendEmail({ 
    to: requestData.email, 
    subject: "Olá",
    text: "Olá, este é um email de teste.",
    template: ConfirmEmail, 
    templateProps: { validationCode } 
  });


  return NextResponse.json({
    error: error
  });
};