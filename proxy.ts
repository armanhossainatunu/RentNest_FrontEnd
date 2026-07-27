import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
const AUTH_ROUTES = ["/login", "/register"];
export function proxy(request: NextRequest) {
  const parthname = request.nextUrl.pathname;
  console.log(request.url);
  console.log(request);
  console.log(request.nextUrl);
  console.log(parthname);

  const accessToken = request.cookies.get("accessToken")?.value;
  const decodeToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;
  let userRole = null;

  if (decodeToken) {
    userRole = decodeToken.role;
  }
 

  if (accessToken && AUTH_ROUTES.includes(parthname)) {
    if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/Landlord_Dashboard", request.url));
    } else if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/Tenant_Dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin_Dashboard", request.url));
    }
  }

//   return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // "/admin_Dashboard/:path*",
    // "/Landlord_Dashboard/:path*",
    // "/Tenant_Dashboard/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
