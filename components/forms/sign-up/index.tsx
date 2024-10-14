"use client";

import { useAuthSignUp } from "@/hooks/authentication";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/global/loader";

export default function SignUpForm() {
  const { register, errors, onInitiateUserRegistration, creating } =
    useAuthSignUp();

  const signUpFields = [
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      inputType: "input",
    },
    {
      id: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      inputType: "input",
    },
  ];

  return (
    <form
      onSubmit={onInitiateUserRegistration}
      className="mt-10 flex flex-col gap-3"
    >
      {signUpFields.map((field) => (
        //@ts-ignore
        <FormGenerator
          key={field.id}
          {...field}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit" className="rounded-2xl">
        <Loader loading={creating}>Sign Up</Loader>
      </Button>
    </form>
  );
}
