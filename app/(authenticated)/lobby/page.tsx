"use client";

import { Card } from "@/components/custom-ui/card";
import { ButtonWithIcon } from "@/components/custom-ui/buttonWithIcon";
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";





export default function Lobby() {

    return (
        <div className="flex items-center justify-center h-screen">
            <Card>
                <div className="absolute top-0 -right-0 p-2">
                    <Popover>
                        <PopoverTrigger>
                            <Avatar className="shadow-lg">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="text-xl text-gray-500">?</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="border-none">
                            <ButtonWithIcon icon={LogOut}>Sair</ButtonWithIcon>
                        </PopoverContent>
                    </Popover>
                </div>
            </Card>
        </div>
    )
}

