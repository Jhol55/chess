import { NextResponse } from "next/server";
import { supabase } from "@/supabase/client";
import { ConfirmEmail } from "@/emails/templates/confirmEmail";
import { sendEmail } from "@/helper/sendEmail";
import { generateValidationCode } from "@/helper/generateValidationCode";


export async function POST(request: Request) { // criptografar password

    const requestData = await request.json();
    delete requestData.repeatPassword;

    const validationCode = generateValidationCode();
    
    const { error } = await supabase
      .from("users")
      .insert({ ...requestData, validationCode: validationCode });

    await sendEmail({ 
      to: requestData.email, 
      template: ConfirmEmail, 
      templateProps: { validationCode } 
    });


    return NextResponse.json({
      error: error
    });
};