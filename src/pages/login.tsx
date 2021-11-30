import { Router } from '@mui/icons-material';
import { Button, Grid, Box, Typography } from '@mui/material';
import { createStyles, createTheme, makeStyles, styled } from '@mui/material/styles';
import { getProviders, signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React, { useEffect } from 'react';
import CustomLoginPaper from 'src/components/customUI/CustomLoginPaper';
import styles from 'src/styles/Home.module.css';

const theme = createTheme()

const Auth = () => {
  const CustomGrid = styled(Grid)({
    textAlign: 'center',
  });
  const CustomButton = styled(Button)({
    width: 250,
    borderRadius: '30px',
    '&:hover': {
      background: 'rgba(0,0,0,0.5)',
    },
  });

  const [session, loading] = useSession();
  const router = useRouter();

  const authorized = () => {
    if (session) {
      router.push('/');
    }
  };
  useEffect(() => {
    authorized();
  });

  return (
    <>
      {!session && (
        <>
          {loading ? (
            <><Typography className={styles.fixCenter}>Loading ...</Typography></>
          ) : (
            <>
              <CustomLoginPaper>
                <Grid container spacing={4}>
                  <CustomGrid item xs={12}>
                    <CustomButton
                      variant='contained'
                      className={styles.github}
                      onClick={() => signIn('github')}
                    >
                      <Image
                        src='/Github-Mark-Light.png'
                        width={20}
                        height={20}
                        alt='Picture of gituhub'
                      />
                      <Box mr={1} />
                      Sign in with GitHub
                    </CustomButton>
                  </CustomGrid>
                  <CustomGrid item xs={12}>
                    <CustomButton
                      variant='contained'
                      className={styles.google}
                      onClick={() => signIn('google')}
                    >
                      <Image
                        src='/google_g_logo.png'
                        width={20}
                        height={20}
                        alt='picture of google'
                      />
                      <Box mr={1} />
                      Sign in with Google
                    </CustomButton>
                  </CustomGrid>
                  <CustomGrid item xs={12}>
                    <CustomButton
                      variant='contained'
                      color='info'
                      onClick={() => signIn('credentials')}
                    >
                      ゲストユーザー
                    </CustomButton>
                  </CustomGrid>
                </Grid>
              </CustomLoginPaper>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Auth;
