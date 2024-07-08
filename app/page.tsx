"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input, Checkbox } from "@/components/custom-ui/form";


const loginFormSchema = z.object({
    email:
        z.string()
            .email("Email inválido"),
    password:
        z.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(64, "A senha deve ter no máximo 64 caracteres")
});


export default function Home() {

    const loginForm = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onLoginSubmit = (data: z.infer<typeof loginFormSchema>) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col justify-center w-[90%] h-[90%] max-w-[500px] p-4">
                <div className="space-y-4 flex flex-col">
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
                </div>             
            </div>
        </div>
    );
}