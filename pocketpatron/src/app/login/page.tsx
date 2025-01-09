'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ✅ Define Form Schema

// ✅ Define Form Schema for Login/Signup
const authSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// ✅ Define TypeScript Types
type AuthFormData = z.infer<typeof authSchema>;

export default function AuthPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  // ✅ Form Handling
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
      resolver: zodResolver(authSchema),
  });

  // ✅ Handle Authentication
  const onSubmit = async (data: AuthFormData) => {
      setError(null);
      const supabase = createClient();

      if (isLogin) {
          // Handle Login
          const { error } = await supabase.auth.signInWithPassword({
              email: data.email,
              password: data.password,
          });

          if (error) {
              console.error('Login failed:', error.message);
              setError(error.message);
              return;
          }

          router.push('/dashboard'); // Redirect to a protected route
      } else {
          // Handle Signup
          const { error } = await supabase.auth.signUp({
              email: data.email,
              password: data.password,
          });

          if (error) {
              console.error('Signup failed:', error.message);
              setError(error.message);
              return;
          }

          router.push('/dashboard'); // Redirect after signup
      }
  };

  return (
      <div className="flex items-center justify-center 1vh">
          <Card className="w-full max-w-md">
              <CardHeader>
                  <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Email Field */}
                      <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              {...register('email')}
                          />
                          {errors.email && (
                              <p className="text-red-500 text-sm">{errors.email.message}</p>
                          )}
                      </div>

                      {/* Password Field */}
                      <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              {...register('password')}
                          />
                          {errors.password && (
                              <p className="text-red-500 text-sm">{errors.password.message}</p>
                          )}
                      </div>

                      {/* Error Message */}
                      {error && <p className="text-red-500 text-sm">{error}</p>}

                      {/* Submit Button */}
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting
                              ? isLogin
                                  ? 'Logging in...'
                                  : 'Signing up...'
                              : isLogin
                              ? 'Login'
                              : 'Sign Up'}
                      </Button>
                  </form>

                  {/* Toggle Login/Signup */}
                  <div className="text-center mt-4">
                      <p>
                          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                          <button
                              type="button"
                              className="text-blue-600 hover:underline"
                              onClick={() => setIsLogin(!isLogin)}
                          >
                              {isLogin ? 'Sign Up' : 'Login'}
                          </button>
                      </p>
                  </div>
              </CardContent>
          </Card>
      </div>
  );
}