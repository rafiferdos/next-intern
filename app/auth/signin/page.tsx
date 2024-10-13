"use client";

import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Github as GithubIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import { handleCredentialsSignin, handleGithubSignin } from "@/app/actions/authActions";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";

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
            console.log("An unexpected error occurred. Please try again.", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card>
                <CardHeader>
                    <h3 className="text-center">
                        Welcome Back
                    </h3>
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
                                <h5 color="error">{form.formState.errors.email.message}</h5>
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
                        {form.formState.isSubmitting && <Spinner color="success" />}
                    </form>
                    <Spacer y={1} />
                    <h3 className="text-center text-xl" color="gray">
                        or
                    </h3>
                    <Spacer y={1} />
                    <form className="w-full" action={handleGithubSignin}>
                        <Button variant="bordered" className="w-full" type="submit">
                            <GithubIcon className="h-4 w-4 mr-2" />
                            Sign in with GitHub
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}