"use client";

import { Card, CardBody, CardHeader, CardFooter, Text, Input, Button, Spacer } from "@nextui-org/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import { handleCredentialsSignin, handleGithubSignin } from "@/app/actions/authActions";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";

export default function SignIn() {
    const [globalError, setGlobalError] = useState<string>("");
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            const result = await handleCredentialsSignin(values);
            if (result?.message) {
                setGlobalError(result.message);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card css={{ mw: "400px" }}>
                <CardHeader>
                    <Text h3 className="text-center">
                        Welcome Back
                    </Text>
                </CardHeader>
                <CardBody>
                    {globalError && <ErrorMessage error={globalError} />}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email address"
                                autoComplete="off"
                                {...form.register("email")}
                            />
                            {form.formState.errors.email && (
                                <Text color="error">{form.formState.errors.email.message}</Text>
                            )}
                        </div>
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter password"
                                {...form.register("password")}
                            />
                            {form.formState.errors.password && (
                                <Text color="error">{form.formState.errors.password.message}</Text>
                            )}
                        </div>
                        <LoadingButton pending={form.formState.isSubmitting} />
                    </form>
                    <Spacer y={1} />
                    <Text className="text-center" size={14} color="gray">
                        or
                    </Text>
                    <Spacer y={1} />
                    <form className="w-full" action={handleGithubSignin}>
                        <Button variant="outlined" className="w-full" type="submit">
                            <GitHubLogoIcon className="h-4 w-4 mr-2" />
                            Sign in with GitHub
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}