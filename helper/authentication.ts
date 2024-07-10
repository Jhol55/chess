
import crypto from 'crypto';
import { SignJWT, jwtVerify  } from "jose"
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const hashPassword = (password: string): string => {
    const salt = crypto.randomBytes(60).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return salt + hash;
};


const verifyPassword = (providedPassword: string, storedPassword: string): boolean => {
    const salt = storedPassword.substring(0, 120);
    const originalHash = storedPassword.substring(120);
    const hash = crypto.pbkdf2Sync(providedPassword, salt, 100000, 64, 'sha512').toString('hex');
    return hash === originalHash;
};

const generateValidationCode = () => {
    return String(Math.floor(100000 + Math.random() * 900000));
};


const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const encrypt = async (payload: any, time: number) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${time + " seconds from now"}`)
        .sign(key);
};

const decrypt = async (input: string) : Promise<any> => { 
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"]
    });
    return payload;
};


const login = async (formData: any) => {
    const user = { email: formData.email };
    const remember = formData.remember;
    const time = remember ? 7 * 24 * 60 * 60 : 60 * 60;
    const expires = new Date(Date.now() + time * 1000);
    const session = await encrypt({ user, expires, remember }, time);
    cookies().set("session", session, { 
        expires, httpOnly: true, 
        secure: true,
        sameSite: 'strict' 
    });
};

const logout = async () => {
    cookies().delete("session");
};

const getSession = async () => {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
};

const updateSession = async (request: NextRequest) => {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    const time = parsed.remember ? 7 * 24 * 60 * 60 : 60 * 60;
    parsed.expires = new Date(Date.now() + time * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed, time),
        expires: parsed.expires,
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    return res;
};


export { hashPassword, verifyPassword, generateValidationCode, login, logout, getSession, updateSession };