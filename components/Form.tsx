"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  type: "register" | "login";
}

const Form = ({ type }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const res = await fetch(type === "register" ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        }),
      });
  
      if (res.ok) {
        toast.success("User created successfully, redirecting...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const errorResponse = await res.text();
        const { error } = errorResponse ? JSON.parse(errorResponse) : { error: "An unknown error occurred" };
        toast.error(error);
      }
    } catch (error) {
      toast.error(`Failed to submit form: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col space-y-4 pb-6 sm:px-16"
      onSubmit={handleFormSubmit}
    >
      <div>
        <Input
          type="email"
          name="email"
          label="Enter Your Email"
          labelPlacement="outside"
          required
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          label="Enter Your Password"
          labelPlacement="outside"
          required
        />
      </div>
      <Spacer y={4} />
      <Button color="success" variant="flat" disabled={isLoading} type="submit">
        {isLoading ? (
          <Spinner color="success" />
        ) : (
          <span>{type === "login" ? "Login" : "Register"}</span>
        )}
      </Button>
      {type === "login" ? (
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="  font-bold text-gray-700">
            Register
          </Link>{" "}
          for free
        </p>
      ) : (
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href={"/login"} className=" font-bold text-gray-700">
            Login
          </Link>{" "}
          instead
        </p>
      )}
    </form>
  );
};
export default Form;
