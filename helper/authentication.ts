import crypto from 'crypto';

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


export { hashPassword, verifyPassword, generateValidationCode };