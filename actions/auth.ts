"use server";

import { db } from "@/db";
import AuthError from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirect: true });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirect: true });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: "ADMIN",
    redirectTo: "/",
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);
  console.log(existingUser);

  try {
    await signIn("credentials", rawFormData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof AuthError && 'type' in error) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  revalidatePath("/");
};
