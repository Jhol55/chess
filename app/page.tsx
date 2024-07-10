"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, Input, Checkbox, ButtonWithLoading } from "@/components/custom-ui/form";
import { Card } from "@/components/custom-ui/card";
import { sendRequest } from "@/helper/sendRequest";
import { useRouter } from "next/navigation";


const loginFormSchema = z.object({
    email:
        z.string()
            .email("Email inválido"),
    password:
        z.string(),       
    remember:
        z.boolean().optional()
});

export default function Home() {
    const router = useRouter();

    const loginForm = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onLoginSubmit = async (formData: z.infer<typeof loginFormSchema>) => {
        const { data } = await sendRequest("api/login", "POST", formData);

        if (!data.success) {
            loginForm.setError("password", {
                message: "Email ou senha inválidos"
            });
            return;
        }     
   
        router.push("/lobby");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card>         
                <h2 className="text-xl font-semibold leading-none tracking-tight px-2">Login</h2>
                <div className="flex items-center">
                    <span className="text-sm text-muted-foreground px-2">
                        Não possui uma conta?
                        <Link href="/register" className="text-primary underline-offset-4 hover:underline text-sm pl-2 font-semibold">
                            Cadastre-se
                        </Link>
                    </span>
                </div>
                <Form form={loginForm} onSubmit={onLoginSubmit}>
                    <Input form={loginForm} name="email" placeholder="Email" />
                    <Input form={loginForm} name="password" placeholder="Senha" type="password" />
                    <Checkbox form={loginForm} name="remember">Manter-me conectado</Checkbox>
                    <ButtonWithLoading form={loginForm} type="submit">Iniciar Sessão</ButtonWithLoading>
                </Form>                            
            </Card>
        </div>
    );
}