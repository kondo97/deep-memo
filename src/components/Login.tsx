import { TextField, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomLoginPaper from 'src/components/customUI/CustomLoginPaper';
import styles from 'src/styles/Home.module.css';

type Props = {
  name: string;
};

const Login = (props: Props) => {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  type Auth = {
    mail: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>();
  const onSubmit = () => {
    switch (props.name) {
      case '新規登録':
        console.log('新規登録');
        break;
      case 'ログイン':
        console.log('ログイン');
        break;
    }
  };
  const mailField = register('mail', { required: true });
  const passwordField = register('password', { required: true });
  return (
    <>
      <CustomLoginPaper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='メールアドレス'
            fullWidth
            size='small'
            {...mailField}
            onChange={(e) => {
              mailField.onChange(e);
            }}
          />
          <Box sx={{ textAlign: 'right' }}>
            {errors.mail && errors.mail.type === 'required' && (
              <span className={styles.alert}>必須項目</span>
            )}
          </Box>
          <Box my={3} />
          <TextField
            label='パスワード'
            fullWidth
            size='small'
            {...passwordField}
            onChange={(e) => {
              passwordField.onChange(e);
            }}
          />
          <Box sx={{ textAlign: 'right' }}>
            {errors.password && errors.password.type === 'required' && (
              <span className={styles.alert}>必須項目</span>
            )}
          </Box>
          <Box mt={6} sx={{ textAlign: 'center' }}>
            <Button type='submit' variant='contained' color='primary'>
              {props.name}
            </Button>
          </Box>
        </form>
      </CustomLoginPaper>
    </>
  );
};

export default Login;
