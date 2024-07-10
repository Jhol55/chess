"use client";

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface UserContextProps {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
} 

const UserContext = createContext<UserContextProps>({
    isAuth: false,
    setIsAuth: () => {}
});

interface UserProvideProps {
    children: React.ReactNode | React.ReactNode[]
}

const UserProvider = ({ children } : UserProvideProps) => {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <UserContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserProvider };