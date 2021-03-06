import { TextField, Box, Radio, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMde from 'react-mde';
import ReactStars from 'react-stars';
import CustomButton from 'src/components/customUI/CustomButton';
import CustomPaper from 'src/components/customUI/CustomPaper';
import 'react-mde/lib/styles/css/react-mde-all.css';
import Redirect from 'src/pages/hooks/useRedirect';
import styles from 'src/styles/Home.module.css';
import { PostProps } from 'types/PostProps';


var Showdown = require('showdown');
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Create: React.FC<{
  props?: PostProps;
  editFlag: boolean;
  id?: number;
  setEditFlag?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ props, editFlag, id, setEditFlag }) => {
  Redirect();
  const router = useRouter();
  const [session, loading] = useSession();
  const [title, setTitle] = useState<string | undefined>(props?.title);
  const setDataTitle = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setTitle(value);
    localStorage.setItem('postTitle', JSON.stringify(value));
  };
  const [content, setContent] = useState<string | undefined>(props?.content);
  const setDataContent = (value: string) => {
    setContent(value);
    localStorage.setItem('postContent', JSON.stringify(value));
  };
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  //ローカルストレージから初期値を取り出す。
  useEffect(() => {
    // const titleValue = localStorage.getItem('postTitle');
    // titleValue && setTitle(JSON.parse(titleValue));
    // const contentValue = localStorage.getItem('postContent');
    // contentValue && setContent(JSON.parse(contentValue));
  }, []);

  //入力フォーム
  type Post = {
    title: string;
    content: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<Post>({ mode: 'onChange' });
  const titleField = register('title', { required: true, maxLength: 20 });

  // ラジオボタン
  const [color, setColor] = useState<string | undefined>(props?.color);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: color === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  //スター
  const [rating, setRationg] = useState<number | undefined>(props?.rating);
  const ratingChanged = (newRating: number) => {
    setRationg(newRating);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    !editFlag
      ? await axios
          .post(
            '/api/create',
            {
              title: title,
              content: content,
              rating: rating,
              color: color,
            },
            {
              params: {
                id: session?.user.id,
              },
            },
          )
          .then((res) => {
            alert('追加しました。');
            router.push('/');
          })
          .catch((error) => {
            console.error(error);
          })
      : await axios
          .put(
            'api/update',
            { title: title, content: content, rating: rating, color: color },
            {
              params: {
                sessionId: session?.user.id,
                //idはpropsで受け取ったpostのid
                postId: id,
              },
            },
          )
          .then((res) => {
            alert('変更を保存しました。');
            router.push('/');
          })
          .catch((error) => {
            console.error(error);
          });
  };

  const destructionCreate = () => {
    if (confirm('作成途中のデータを削除します。')) {
      setTitle('');
      setContent('');
      if (confirm('トップに戻りますか。')) {
        router.push('/');
      }
    }
  };

  const cancelEdit = () => {
    confirm('キャンセルします。※変更は保存されません。') && setEditFlag && setEditFlag(!editFlag);
  };

  return (
    <>
      <CustomPaper elevation={3}>
        <form onSubmit={onSubmit}>
          <TextField
            placeholder='タイトル'
            fullWidth
            {...titleField}
            value={title}
            onChange={(e) => {
              titleField.onChange(e);
              setDataTitle(e);
            }}
            required
          />
          <Box sx={{ textAlign: 'right' }}>
            {errors.title && errors.title.type === 'required' && (
              <span className={styles.alert}>必須項目</span>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <span className={styles.alert}>最大30文字</span>
            )}
          </Box>
          <Box my={4} />
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>スター</Typography>
              {/* スター */}
            </Grid>
            <Grid item xs={9} ml={1}>
              <ReactStars
                value={rating}
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'}
                half={false}
              />
            </Grid>
            {/* ラジオボタン */}
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>テーマカラー</Typography>
            </Grid>
            <Grid item xs={9}>
              <div>
                <Radio
                  {...controlProps('a')}
                  sx={{
                    color: 'postThemeA.main',
                    '&.Mui-checked': { color: 'postThemeA.main' },
                  }}
                />
                <Radio
                  {...controlProps('b')}
                  sx={{
                    color: 'postThemeB.main',
                    '&.Mui-checked': { color: 'postThemeB.main' },
                  }}
                />
                <Radio
                  {...controlProps('c')}
                  sx={{
                    color: 'postThemeC.main',
                    '&.Mui-checked': { color: 'postThemeC.main' },
                  }}
                />
                <Radio
                  {...controlProps('d')}
                  sx={{
                    color: 'postThemeD.main',
                    '&.Mui-checked': { color: 'postThemeD.main' },
                  }}
                />
                <Radio
                  {...controlProps('e')}
                  sx={{
                    color: 'postThemeE.main',
                    '&.Mui-checked': { color: 'postThemeE.main' },
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Box my={4} />
          <ReactMde
            value={content}
            onChange={(value) => setDataContent(value)}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={6}>
            {!editFlag && (
              <>
                <CustomButton
                  type='submit'
                  variant='contained'
                  color='secondary'
                  onClick={destructionCreate}
                >
                  破棄
                </CustomButton>
                <CustomButton
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!formState.isValid}
                >
                  追加
                </CustomButton>
              </>
            )}
            {editFlag && (
              <>
                <CustomButton variant='contained' color='secondary' onClick={cancelEdit}>
                  キャンセル
                </CustomButton>
                <CustomButton
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!formState.isValid}
                >
                  変更を保存
                </CustomButton>
              </>
            )}
          </Box>
        </form>
      </CustomPaper>
    </>
  );
};

export default Create;
