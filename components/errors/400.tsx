"use client";

import Link from "next/link";

const Status400 = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-8xl font-semibold leading-none tracking-tight">404</h1>
            <h2 className="text-3xl leading-none tracking-tight">Page Not Found</h2>
            <p className="text-xl">{"A página que você procura não existe. Ir para o" + " "} 
                <Link href="/" className="text-primary underline-offset-4 hover:underline text-xl font-semibold leading-none tracking-tight">
                    início
                </Link>
            </p>
        </div>
    )
};

export { Status400 };