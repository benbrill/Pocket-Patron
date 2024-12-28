import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value);
                        supabaseResponse.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    // ✅ Step 1: Check Session
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Supabase Auth Error:', error.message);
    }

    // ✅ Step 2: Redirect Unauthenticated Users
    if (!user) {
        const unauthenticatedPaths = ['/login', '/auth'];
        if (!unauthenticatedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
            console.warn('Unauthenticated user attempted to access:', request.nextUrl.pathname);

            const loginUrl = request.nextUrl.clone();
            loginUrl.pathname = '/login';
            loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname); // Preserve original route
            return NextResponse.redirect(loginUrl);
        }
    }

    return supabaseResponse;
}
