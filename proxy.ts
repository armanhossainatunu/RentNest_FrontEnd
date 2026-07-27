import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const partname = request.nextUrl.pathname
  console.log("proxy",partname);

  return NextResponse.redirect(new URL('/', request.url))
}
 

export const config = {
  matcher:[
     '/Admin_Dashboard/:path*',
     '/Landlord_Dashboard/:path*',
     '/Tenant_Dashboard/:path*',
  ]
}