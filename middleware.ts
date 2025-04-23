// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define your protected routes (e.g., /admin, /dashboard)
const protectedRoutes = ['/admin', '/dashboard', '/user'];
const adminRoutes = ['/admin']; // Routes specifically for admins

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the authentication cookie set by the backend
  const authCookie = request.cookies.get('QuizAppCookie'); // Use the actual cookie name

  // In this cookie-based approach, the primary validation happens
  // when the frontend makes API calls to the backend with the cookie.
  // The middleware's main job here is to check if *a* valid-looking
  // authentication cookie exists before allowing access to protected routes.
  // Full validation (including role checks if needed for middleware redirects)
  // might require an internal API call from middleware to the backend
  // or storing basic, signed user/role info in a separate client-readable cookie
  // (less secure, but faster in middleware).

  // For a simple check: redirect if no auth cookie on protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authCookie) {
      const loginUrl = new URL('/user/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Optional: More advanced check requiring an internal API call
    // to validate the cookie and get user role from the backend in middleware
    // if you need role-based redirects here. This adds latency.
    // let userRole = null;
    // try {
    //   const validationResponse = await fetch('YOUR_ASPNET_BACKEND_URL/api/auth/validate-session', {
    //      headers: { 'Cookie': request.headers.get('Cookie') || '' } // Forward the cookie
    //   });
    //   if (validationResponse.ok) {
    //      const userData = await validationResponse.json();
    //      userRole = userData.role;
    //   }
    // } catch (error) {
    //   console.error('Middleware validation error:', error);
    // }

    // Simple role check based on assuming role info might be in the cookie value (less secure)
    // Or based on the result of an internal validation API call above
    let userRole: string | undefined;
    if (authCookie) {
      try {
          // **Again, this is a simplified example. Parse/decrypt securely.**
          const userData = JSON.parse(authCookie.value);
          userRole = userData.role;
      } catch (e) {
            console.error("Failed to parse cookie in middleware:", e);
      }
    }


    if (adminRoutes.some((route) => pathname.startsWith(route)) && userRole !== 'admin') {
         // Redirect non-admins from admin routes
         return NextResponse.redirect(new URL('/user/auth/forbidden', request.url)); // Or user dashboard
    }

  }

   // Redirect authenticated users from login/signup pages
    if (authCookie && (pathname === '/user/auth/login' || pathname === '/user/auth//signup')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url)); // Redirect to user dashboard
    }


  // Allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher as before
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)).*)',
  ],
};