import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = [
  "/",
  "/properties",
  "/about",
  "/features",
  "/contact",
  "/payment/success",
  "/payment/cancel",
];
export function proxy(request: NextRequest) {
  const parthname = request.nextUrl.pathname;
  // console.log(request.url);
  // console.log(request);
  // console.log(request.nextUrl);
  // console.log(parthname);

  const accessToken = request.cookies.get("accessToken")?.value;
  const decodeToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload)
    : null;
  let userRole = null;

  if (decodeToken) {
    userRole = decodeToken.role;
  }

  if (accessToken && AUTH_ROUTES.includes(parthname)) {
    if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
    } else if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/tenant-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin_Dashboard", request.url));
    }
  }
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => parthname === route || parthname.startsWith(route + "/"),
  );
  const isAUthRoute = AUTH_ROUTES.some(
    (route) => parthname === route || parthname.startsWith(route + "/"),
  );
  //Authentication page protection
  if (!accessToken && !isPublicRoute && !isAUthRoute)
    return NextResponse.redirect(new URL("/login", request.url));

  if (parthname.startsWith("/admin_Dashboard") && userRole !== "ADMIN")
    return NextResponse.redirect(new URL("/not-found", request.url));
  if (parthname.startsWith("/landlord-dashboard") && userRole !== "LANDLORD")
    return NextResponse.redirect(new URL("/not-found", request.url));
  if (parthname.startsWith("/propertiesCreate") && userRole !== "LANDLORD")
    return NextResponse.redirect(new URL("/not-found", request.url));
  if (parthname.startsWith("/tenant-dashboard") && userRole !== "TENANT")
    return NextResponse.redirect(new URL("/not-found", request.url));

  //   return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // "/admin_Dashboard/:path*",
    // "/landlord-dashboard/:path*",
    // "/tenant-dashboard/:path*",
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
