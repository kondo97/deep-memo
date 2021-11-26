import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function useRidirect() {
  const [session, loading] = useSession();
  const router = useRouter();
  const redirectPage = () => {
    if (!session && !loading) {
      router.push('/login');
    }
  };
  useEffect(() => {
    redirectPage();
  })
  return (
    <>
    </>
  )
};
