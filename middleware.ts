import { NextRequest, NextResponse } from "next/server";
import { updateSession, getSession } from "./helper/authentication";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const response = await updateSession(request);
  const path = request.nextUrl.pathname;
  
  if (session && path === "/") return NextResponse.redirect(new URL("/lobby", request.url));
  if (!session && path !== "/") return NextResponse.redirect(new URL("/", request.url));
  if (response) return response;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|/$|register|confirm).*)",
  ],
};
