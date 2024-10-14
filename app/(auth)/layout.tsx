import BackdropGradient from '@/components/global/backdrop-gradient';
import GlassCard from '@/components/global/glass-card';
import { authOptions } from '@/server/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  // @ts-ignore
  const session = await getServerSession(authOptions);

  if (session) redirect('/admin');

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="flex w-full flex-col items-center py-24">
        <h2 className="text-themeTextWhite text-4xl font-bold">Grouple.</h2>
        <BackdropGradient
          className="h-2/6 w-4/12 opacity-40"
          container="flex flex-col items-center"
        >
          <GlassCard className="xs:w-full mt-16 p-7 md:w-7/12 lg:w-5/12 xl:w-4/12">
            {children}
          </GlassCard>
        </BackdropGradient>
      </div>
    </div>
  );
};

export default AuthLayout;
