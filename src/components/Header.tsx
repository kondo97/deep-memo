import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import CustomButton from 'src/components/customUI/CustomButton';
import styles from 'src/styles/Home.module.css';

export default function Header() {
  const router = useRouter();
  const [session, loading] = useSession();
  const signOutConfirm = async () => {
    const confirm = window.confirm('ログアウトしますか。');
    if(confirm) {
      signOut()
      router.push('/login')
    }
  };
  const goTop = () => {
    if (session) router.push('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' className={styles.headerColor}>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            className={styles.pointer}
            onClick={() => goTop()}
          >
            Deep Memo
          </Typography>
          {session && (
            <>
              <Link href='/create' passHref>
                <CustomButton variant='contained' color='primary'>
                  新規作成
                </CustomButton>
              </Link>
              <CustomButton variant='contained' color='secondary' onClick={() => signOutConfirm()}>
                ログアウト
              </CustomButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
