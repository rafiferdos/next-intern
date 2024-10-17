/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envConfig from "@/config/engConfig";
import axiosInstance from "@/config/axios.config";
import { IUser } from "@/types/IUser";
import { revalidateTag } from "next/cache";

export const getUsers = async () => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "force-cache" as RequestCache,
  };

  const res = await fetch(`${envConfig.baseApi}/users`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const getUser = async (nickName: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store" as RequestCache,
  };

  const res = await fetch(
    `${envConfig.baseApi}/users/${nickName}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const updateUser = async (
  userData: IUser,
  userId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/users/${userId}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("users");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
};
export const updateProfilePhoto = async (userData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(
      `/users/update-profile-photo`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("users");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
};
export const deleteUser = async (userId: string) => {
  try {
    const res = await axiosInstance.delete(`/users/${userId}`);
    revalidateTag("users");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user");
  }
};
