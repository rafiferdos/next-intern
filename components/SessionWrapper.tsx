"use client";
import { ReactNode } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const SessionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {children}
    </ClerkProvider>
  );
};

export default SessionWrapper;
