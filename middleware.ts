// import { NextResponse } from "next/server";
import { NextRequest, NextResponse } from "next/server";

const AuthRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.match(/^\/contact_us/)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/register", "/contact_us"],
};
