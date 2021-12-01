import { User, Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';
import { createUser } from '../__test__/factories/user/createUser';
import { deleteUser } from '../__test__/factories/user/deleteUser';
import handler from '../pages/api/update';
import { createPost } from './factories/create/createPost';
import { deletePost } from './factories/create/deletePosts';

describe('/api/getAllPosts', () => {
  let user: User;
  beforeAll(async () => {
    user = await createUser();
  });
  afterAll(async () => {
    await deleteUser(user.id);
  });
  describe('When user is not logged in.', () => {
    test('It returns 401 response', async () => {
      const mockReq = httpMocks.createRequest<NextApiRequest>({
        query: {
          id: null,
        },
      });
      const mockRes = httpMocks.createResponse<NextApiResponse>();
      await handler(mockReq, mockRes);
      expect(mockRes.statusCode).toEqual(401);
    });
  });
  describe('When user is logged in.', () => {
    describe('post does not exist.', () => {
      test('It returns 404 response', async () => {
        const mockReq = httpMocks.createRequest<NextApiRequest>({
          query: {
            sessionId: user.id,
            postId: null,
          },
        });
        const mockRes = httpMocks.createResponse<NextApiResponse>();
        await handler(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(404);
      });
    });
    describe('post exist.', () => {
      let post: Post;
      beforeEach(async () => {
        post = await createPost(user.id);
      });
      afterEach(async () => {
        await deletePost(post.id);
      });
      test('It returns 200 response', async () => {
        const mockReq = httpMocks.createRequest<NextApiRequest>({
          query: {
            sessionId: user.id,
            postId: post.id,
          },
          body: {
            title: 'タイトル2',
            content: 'コンテント2',
          },
        });
        const mockRes = httpMocks.createResponse<NextApiResponse>();
        await handler(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(200);
        const res = JSON.parse(mockRes._getData());
        expect(res.title).toBe('タイトル2');
        expect(res.content).toBe('コンテント2');
      });
    });
  });
});
