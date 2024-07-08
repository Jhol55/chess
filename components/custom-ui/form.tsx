"use client";

import {
    Form as _Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    InputOTP as _InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";


import { UseFormReturn } from "react-hook-form";

import { Input as _Input } from "@/components/ui/input";
import { Checkbox as _Checkbox } from "@/components/ui/checkbox"
import React, { useId, useState } from "react";

interface FormProps {
    form: UseFormReturn<any>;
    onSubmit: (data: any) => void;
    children: React.ReactNode;
}
const Form = ({ form, onSubmit, children }: FormProps) => {
    return (
        <_Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4" autoComplete="on">
                {children}
            </form>
        </_Form>
    )
};




interface InputProps {
    form: UseFormReturn<any>;
    name: string;
    placeholder: string;
    type?: string;
}
const Input = ({ form, name, placeholder, type }: InputProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <_Input placeholder={placeholder} type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};

interface InputOTPProps {
    form: UseFormReturn<any>;
    name: string;
    length: number;
    onComplete?: () => void;
}

const InputOTP = ({ form, name, length } : InputOTPProps) => {

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <_InputOTP maxLength={length} {...field}>
                            <InputOTPGroup>
                                {Array.from({ length: length }, (_, index) => {
                                    return (
                                        <InputOTPSlot key={index} index={index} />
                                    )
                                })}
                            </InputOTPGroup>
                        </_InputOTP>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}


interface CheckboxProps {
    children: string;
}

const Checkbox = ({ children }: CheckboxProps) => {
    const id = useId()

    return (
        <div className="flex items-center gap-2">
            <_Checkbox id={id} />
            <label htmlFor={id} className="text-sm text-muted-foreground cursor-pointer">{children}</label>
        </div>
    )
};


export { Form, Input, Checkbox, InputOTP };