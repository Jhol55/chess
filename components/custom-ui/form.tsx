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
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import React, { useEffect, useId, useState } from "react";

interface FormProps {
    form: UseFormReturn<any>;
    onSubmit: (data: any) => void;
    children: React.ReactNode;
}
const Form = ({ form, onSubmit, children }: FormProps) => {
    return (
        <_Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4 py-2 px-2 -translate-y-2 relative overflow-hidden"
                autoComplete="on">
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
                        <_Input
                            placeholder={placeholder}
                            type={type}
                            {...field}
                        />
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

const InputOTP = ({ form, name, length }: InputOTPProps) => {

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
    form: UseFormReturn<any>;
    name: string;
    children: string;
}

const Checkbox = ({ form, name, children }: CheckboxProps) => {
    const id = useId()

    return (
        <div className="flex items-center gap-2 py-2">
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <_Checkbox
                                className="absolute -translate-y-2"
                                id={id}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <label
                htmlFor={id}
                className="absolute translate-x-6 text-sm text-muted-foreground cursor-pointer">
                {children}
            </label>
        </div>
    )
};

interface ButtonWithLoadingProps {
    form: UseFormReturn<any>;
    type: "submit" | "button" | "reset";
    className?: string;
    children: string;
}

const ButtonWithLoading = ({ form, type, className, children } : ButtonWithLoadingProps) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(form.formState.isSubmitting || form.formState.isSubmitSuccessful);
    }, [form.formState.isSubmitSuccessful, form.formState.isSubmitting]);

    return (
        <Button disabled={isLoading} type={type} className={className}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    )
}


export { Form, Input, Checkbox, InputOTP, ButtonWithLoading };