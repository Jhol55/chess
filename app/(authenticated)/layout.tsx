import { Toaster } from "@/components/ui/sonner"

import { UserProvider } from "@/contexts/useUserContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (      
        <>
            {children}                
        </>    
    );
}
