"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { signIn } from "next-auth/react";
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
    if (type === "register") {
      setIsLoading(true);
      const res = await fetch("/api/auth/register", {
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
        toast.success("user created successfully redirecting to");
        setIsLoading(false);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const { error } = await res.json();
        setIsLoading(false);
        toast.error(error);
      }
    } else {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        redirect: false,
      });
      if (res?.ok) {
        setIsLoading(false);
        router.push("/protected");
      } else {
        const error = res?.error;
        toast.error(error!);
      }
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
        {/* <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <RotateCwIcon className="animate-spin" />
          ) : (
            <span>{type === "login" ? "Login" : "Register"}</span>
          )}
        </Button> */}
        {
          !isLoading ? (
            <Button color="success" variant="flat">Login</Button>
          ):
          (
            <Spinner color="success" />
          )
        }
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
