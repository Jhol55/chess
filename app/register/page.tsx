"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input } from "@/components/custom-ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/helper/sendRequest";
import { supabase } from "@/supabase/client";


const registerFormSchema = z.object({
    username:
        z.string()
            .min(1, "O nome de usuário deve ter no mínimo 1 caracter")
            .max(32, "O nome de usuário deve ter no máximo 32 caracteres"),
    email:
        z.string()
            .max(64, "O email deve ter no máximo 64 caracteres")
            .email("Email inválido"),
    password:
        z.string()
            .min(6, "A senha deve ter no mínimo 6 caracteres")
            .max(64, "A senha deve ter no máximo 64 caracteres"),
    repeatPassword:
        z.string()
            .min(6, "A senha deve ter no mínimo 6 caracteres")
            .max(64, "A senha deve ter no máximo 64 caracteres")

})
.refine((formData) => formData.password === formData.repeatPassword, {
    message: "As senhas não coincidem",
    path: ["repeatPassword"]
})
.refine(async (formData) => {
    
    const { data } : { data: any } = await supabase
        .from("users")
        .select("email")
        .eq("email", formData.email)
        .single()

    return data?.email !== formData.email

}, {
    message: "Email já cadastrado",
    path: ["email"]
});


export default function RegisterAccount() {

    const router = useRouter();

    const registerForm = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        },
    });

    const onRegisterSubmit = (data: z.infer<typeof registerFormSchema>) => {
        router.push("/confirm");
        localStorage.setItem("email", data.email);       
        sendRequest("/api/register", "POST", data);
    };


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col justify-center w-[90%] h-[90%] max-w-[500px] p-4 space-y-4">
                <h1 className="text-xl font-semibold leading-none tracking-tight">Cadastrar uma conta</h1>
                <span className="text-sm text-muted-foreground">
                    Já possui uma conta?
                    <Link href="/" className="text-primary underline-offset-4 hover:underline text-sm pl-2 font-semibold">Iniciar Sessão</Link>
                </span>
                <Form form={registerForm} onSubmit={onRegisterSubmit}>
                    <Input form={registerForm} name="username" placeholder="Nome de usuário" />
                    <Input form={registerForm} name="email" placeholder="Email" />
                    <Input form={registerForm} name="password" placeholder="Senha" type="password" />
                    <Input form={registerForm} name="repeatPassword" placeholder="Repetir senha" type="password" />
                    <Button className="self-center" type="submit">Cadastre-se</Button>
                </Form>
            </div>
        </div>
    )
}