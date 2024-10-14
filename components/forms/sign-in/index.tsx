"use client";

import { FormGenerator } from "@/components/global/form-generator";
import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useAuthSignIn } from "@/hooks/authentication";
import React from "react";

type AuthFormProps = React.ComponentProps<typeof FormGenerator> & {
  inputType: string;
  id: string;
};

type SignInFieldProps = Omit<AuthFormProps, 'register' | 'errors'>;

const SignInForm = (props: AuthFormProps) => {
  const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn();

  const signInFields: SignInFieldProps[] = [
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      inputType: "input",
    },
  ];

  return (
    <form className="mt-10 flex flex-col gap-3" onSubmit={onAuthenticateUser}>
      {signInFields.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit" className="rounded-2xl">
        <Loader loading={isPending}>Sign In with Google</Loader>
      </Button>
    </form>
  );
};

export default SignInForm;
