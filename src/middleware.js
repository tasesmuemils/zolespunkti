import { updateSession } from '@/utils/superbase/middleware';

export async function middleware(request) {
  // Check if the request is for a CSS file
  if (request.nextUrl.pathname.endsWith('.css')) {
    return NextResponse.next();
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    // '/dashboard/game',
    // '/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json|.*\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)',
    '/((?!_next/static|_next/image|favicon.ico|sw.js|.*\\.css|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
