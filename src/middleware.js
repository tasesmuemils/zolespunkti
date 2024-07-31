import { updateSession } from '@/utils/superbase/middleware';

export async function middleware(request) {
  // Check if the request is for a CSS file
  // Check if the request is for static assets
  if (
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.match(
      /\.(js|css|svg|png|jpg|jpeg|gif|webp|ico|json)$/
    )
  ) {
    return NextResponse.next();
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sw.js|.*\\.(?:js|css|svg|png|jpg|jpeg|gif|webp|ico|json)$).*)',
  ],
};
