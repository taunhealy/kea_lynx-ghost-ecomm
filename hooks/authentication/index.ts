'use client';

import { SignInSchema } from '@/components/forms/sign-in/schema';
import { SignUpSchema } from '@/components/forms/sign-up/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const useAuthSignIn = () => {
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(SignInSchema)
  });

  const onAuthenticateUser = handleSubmit(async (data) => {
    setIsPending(true);
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/admin'
      });
      // @ts-ignore
      if (result?.error) {
        // @ts-ignore
        console.error(result.error);
        toast('Error', {
          description: 'Failed to sign in with Google'
        });
      }
      // Successful sign-in will be handled by NextAuth.js
    } catch (error) {
      console.error(error);
      toast('Error', {
        description: 'An unexpected error occurred'
      });
    } finally {
      setIsPending(false);
    }
  });

  return { isPending, onAuthenticateUser, register, errors };
};

export const useAuthSignUp = () => {
  const router = useRouter();
  const [creating, setCreating] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur'
  });

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    try {
      setCreating(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (response.ok) {
        reset();
        toast('Success', {
          description: data.message
        });
        // Sign in the user after successful registration
        const result = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password
        });
        // @ts-ignore
        if (result?.ok) {
          router.push('/admin');
        } else {
          toast('Error', {
            description: 'Failed to sign in after registration'
          });
        }
      } else {
        toast('Error', {
          description: data.error || 'Failed to create user'
        });
      }
    } catch (error) {
      console.error(error);
      toast('Error', {
        description: 'An unexpected error occurred'
      });
    } finally {
      setCreating(false);
    }
  });

  return {
    register,
    errors,
    onInitiateUserRegistration,
    creating
  };
};

export const useGoogleAuth = () => {
  const signInWithGoogle = () => {
    signIn('google', { callbackUrl: '/admin' });
  };

  return { signInWithGoogle };
};
