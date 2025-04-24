// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define your protected routes (e.g., /admin, /dashboard)
const protectedRoutes = ['/admin', '/user'];
const openRoutes = ['/auth', '/about'];
const adminRoutes = ['/admin']; // Routes specifically for admins

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/auth/login', request.url);

  const authCookie = request.cookies.get('QuizAppCookie'); 
  console.log('Auth cookie found:', !!authCookie);

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authCookie) {

      if(openRoutes.some((route) => pathname.startsWith(route) )){
        return NextResponse.next();
      }
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    console.log(`authorization on protected route w cookie`)
    
    try {
      console.log(`trying to send request to status route`)

      const userRole = request.cookies.get('userRole')?.value
      if(userRole){
        if (pathname === '/auth/login' || pathname === '/auth/register') {
          return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url)); // Redirect to user dashboard
        }
        
        if (adminRoutes.some((route) => pathname.startsWith(route)) && userRole !== 'admin') {
          // Redirect non-admins from admin routes
          return NextResponse.redirect(new URL('/auth/forbidden', request.url)); 
        }
      
      }else{

        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
          
    } catch (e) {
      console.error("Failed to parse cookie in middleware:", e);
      return new NextResponse(JSON.stringify({ message: 'Authentication check failed due to backend error' }), { status: 500 });
    }
  }
  return NextResponse.next();
}

// Configure the matcher as before
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)).*)',
  ],
};