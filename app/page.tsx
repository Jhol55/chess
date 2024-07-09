"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input, Checkbox } from "@/components/custom-ui/form";
import { Card } from "@/components/custom-ui/card";
import { sendRequest } from "@/helper/sendRequest";


const loginFormSchema = z.object({
    email:
        z.string()
            .email("Email inválido"),
    password:
        z.string()  
            
});


export default function Home() {

    const loginForm = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onLoginSubmit = async (formData: z.infer<typeof loginFormSchema>) => {  //verificar password
        const { data } = await sendRequest("api/login/check-password", "POST", formData);

        if (!data.success) {
            loginForm.setError("email", {
                message: "Email ou senha inválidos"
            });
            return;
        }

        
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card>         
                <h2 className="text-xl font-semibold leading-none tracking-tight">Login</h2>
                <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                        Não possui uma conta?
                        <Link href="/register" className="text-primary underline-offset-4 hover:underline text-sm pl-2 font-semibold">
                            Cadastre-se
                        </Link>
                    </span>
                </div>
                <Form form={loginForm} onSubmit={onLoginSubmit}>
                    <Input form={loginForm} name="email" placeholder="Email" />
                    <Input form={loginForm} name="password" placeholder="Senha" type="password" />
                    <Checkbox>Manter-me conectado</Checkbox>
                    <Button className="self-center" type="submit">Iniciar Sessão</Button>
                </Form>                            
            </Card>
        </div>
    );
}