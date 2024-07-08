import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

import { UserProvider } from "@/contexts/useUserContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>              
                {children}         
              <Toaster />
            </body>
       </html>
    );
}
