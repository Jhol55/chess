"use client";


import { Button } from "@/components/ui/button";
import { Status400 } from "@/components/errors/400";
import { useEffect, useState } from "react";
import { sendRequest } from "@/helper/sendRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonWithLoading, Form, InputOTP } from "@/components/custom-ui/form";
import { Card } from "@/components/custom-ui/card";
import { useRouter } from "next/navigation";

const confirmFormSchema = z.object({
    validationCode:
        z.string()
            .min(6, "O código deve ter 6 caracteres")
            .max(6, "O código deve ter 6 caracteres")
})

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

    const onConfirmSubmit = async (formData: z.infer<typeof confirmFormSchema>) => {
        const { data } = await sendRequest("/api/confirm", "POST", { ...formData, email: email });  

        if (!data.success) {
            confirmForm.setError("validationCode", {
                message: "Código inválido"
            });
            return;
        }

        localStorage.removeItem("email");
        router.push("/");          
    };

    return (email ?
        <div className="flex items-center justify-center h-screen">
            <Card>
                <div className="self-center space-y-4">
                    <h2 className="text-xl font-semibold leading-none tracking-tight px-2">Confirmar código</h2>
                    <p className="text-sm text-gray-800 px-2">
                        Um código de confirmação foi enviado para
                        <b className="text-primary text-sm font-semibold">{" " + email}</b>.
                        Por favor, verifique sua caixa de entrada e siga as instruções para completar o processo de registro.
                    </p>
                    <Form form={confirmForm} onSubmit={onConfirmSubmit}>
                        <div className="flex gap-4">
                            <InputOTP form={confirmForm} name="validationCode" length={6}/>
                            <ButtonWithLoading form={confirmForm} type="submit" className="mt-2">Confirmar</ButtonWithLoading>
                        </div>
                    </Form>
                    <p className="text-sm text-gray-800 px-2">Não recebeu o código?</p>
                    <Button type="button" className="max-w-[500px] ml-2">Reenviar</Button>
                </div>
            </Card>
        </div> : !loading && <Status400/>
    )
}