"use client";

import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/hooks/authentication";
import { Google } from "@/icons";
import { Loader } from "../loader";

interface GoogleAuthButtonProps {
  method: 'signup' | 'login';
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ method }) => {
  const { signInWithGoogle } = useGoogleAuth();
  return (
    <Button
      onClick={signInWithGoogle}
      className="bg-themeBlack border-themeGray flex w-full gap-3 rounded-2xl"
      // @ts-ignore
      variant="outline"
    >
      <Loader loading={false}>
        <Google />
        Sign in with Google
      </Loader>
    </Button>
  );
};
