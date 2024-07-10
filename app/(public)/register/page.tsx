"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonWithLoading, Form, Input } from "@/components/custom-ui/form";
import { Card } from "@/components/custom-ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/helper/sendRequest";


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

    const onRegisterSubmit = async (formData: z.infer<typeof registerFormSchema>) => {
        const { data } = await sendRequest("/api/register", "POST", formData);

        if (!data.success) {
            registerForm.setError("email", {
                message: "Email já cadastrado"
            });
            return;
        }

        localStorage.setItem("email", formData.email);  
        router.push("/confirm");                
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card>
                <h2 className="text-xl font-semibold leading-none tracking-tight px-2">Cadastrar uma conta</h2>
                <span className="text-sm text-muted-foreground px-2">
                    Já possui uma conta?
                    <Link href="/" className="text-primary underline-offset-4 hover:underline text-sm pl-2 font-semibold">Iniciar Sessão</Link>
                </span>
                <Form form={registerForm} onSubmit={onRegisterSubmit}>
                    <Input form={registerForm} name="username" placeholder="Nome de usuário"/>
                    <Input form={registerForm} name="email" placeholder="Email"/>
                    <Input form={registerForm} name="password" placeholder="Senha" type="password" />
                    <Input form={registerForm} name="repeatPassword" placeholder="Repetir senha" type="password" />
                    <ButtonWithLoading form={registerForm} type="submit">Cadastre-se</ButtonWithLoading>
                </Form>
            </Card>
        </div>
    )
}