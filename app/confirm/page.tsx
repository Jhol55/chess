"use client";


import { Button } from "@/components/ui/button";
import { Status400 } from "@/components/errors/400";

import { useEffect, useState } from "react";
import { sendRequest } from "@/helper/sendRequest";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, InputOTP } from "@/components/custom-ui/form";

import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";

const confirmFormSchema = z.object({
    validationCode:
        z.string()
            .min(6, "O código deve ter 6 caracteres")
            .max(6, "O código deve ter 6 caracteres")
})
.refine(async (formData) => {
    const email = localStorage.getItem("email");

    const { data } : { data: any } = await supabase
        .from("users")
        .select("validationCode")
        .eq("email", email)
        .single()

    return data.validationCode === formData.validationCode
}, {
    message: "Código inválido",
    path: ["validationCode"]
});


export default function ConfirmEmail() {

    const confirmForm = useForm({
        resolver: zodResolver(confirmFormSchema),
        defaultValues: {
            validationCode: ""           
        },
    });

    const [email, setEmail] = useState<string | null | undefined>(undefined);
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {      
        setEmail(localStorage.getItem("email"));
        setLoading(false);       
    }, [])

    const onSubmit = (data: z.infer<typeof confirmFormSchema>) => {
        router.push("/")
        localStorage.removeItem("email");
        sendRequest("/api/confirm", "POST", { ...data, email: email });       
    }

    return (email ?
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col justify-center w-[90%] h-[90%] max-w-[500px] p-4">
                <div className="self-center space-y-4">
                    <h1 className="text-xl font-semibold leading-none tracking-tight">Confirmar código</h1>
                    <p className="text-sm text-gray-800">
                        Um código de confirmação foi enviado para
                        <b className="text-primary underline-offset-4 text-sm font-semibold">{" " + email}</b>.
                        Por favor, verifique sua caixa de entrada e siga as instruções para completar o processo de registro.
                    </p>
                    <Form form={confirmForm} onSubmit={onSubmit}>
                        <div className="flex gap-4">
                            <InputOTP form={confirmForm} name="validationCode" length={6}/>
                            <Button type="submit" className="mt-2">Confirmar</Button>
                        </div>
                    </Form>
                    <p className="text-sm text-gray-800">Não recebeu o código?</p>
                    <Button type="button" className="max-w-[500px]">Reenviar</Button>
                </div>
            </div>
        </div> : !loading && <Status400/>
    )
}