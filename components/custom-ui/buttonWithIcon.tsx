import { Button } from "@/components/ui/button";
import React from "react";

interface ButtonWithIconProps {
    icon: React.ComponentType
    iconProps?: React.SVGProps<SVGSVGElement>;
    children: string
}
const ButtonWithIcon = ({ icon, iconProps, children } : ButtonWithIconProps) => {
  return (
    <Button className="flex">
      {React.createElement(icon, { ...iconProps, className: "mr-2 h-4 w-4" })}
      {children}
    </Button>
  )
}

export { ButtonWithIcon };