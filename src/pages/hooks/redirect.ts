import { signOut, useSession, Provider, signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const Redirect = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const redirectPage = () => {
    if (!session && !loading) {
      router.push('login');
    }
  };
  redirectPage();
};

export default Redirect;
