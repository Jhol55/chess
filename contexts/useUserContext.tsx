"use client";

import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface UserContextProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
} 


const UserContext = createContext<UserContextProps>({
    email: "",
    setEmail: () => {}
});

interface UserProvideProps {
    children: React.ReactNode | React.ReactNode[]
}

const UserProvider = ({ children } : UserProvideProps) => {

    const [email, setEmail] = useState("")

    return (
        <UserContext.Provider value={{ email, setEmail }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserProvider };