import SignUpForm from "@/components/forms/sign-up";
import { GoogleAuthButton } from "@/components/global/google-oauth-button";
import { Separator } from "@/components/ui/separator";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <>
      <h5 className="text-themeTextWhite text-base font-bold">Signup</h5>
      <p className="text-themeTextGray leading-tight">
        Network with people from around the world, join groups, create your own,
        watch courses and become the best version of yourself.
      </p>
      <SignUpForm />
      <div className="relative my-10 w-full">
        <div className="text-themeTextGray absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-black p-3 text-xs">
          OR CONTINUE WITH
        </div>
        <Separator orientation="horizontal" className="bg-themeGray" />
      </div>

      <GoogleAuthButton method="signup" />
    </>
  );
};

export default SignUpPage;
