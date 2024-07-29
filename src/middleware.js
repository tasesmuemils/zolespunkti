import { updateSession } from '@/utils/superbase/middleware';

export async function middleware(request) {
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
    '/((?!_next/static|_next/image|favicon.ico|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
