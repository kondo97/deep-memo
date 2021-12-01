import { User, Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';
import { createUser } from '../__test__/factories/user/createUser';
import { deleteUser } from '../__test__/factories/user/deleteUser';
import handler from '../pages/api/create';
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
    let post: Post;
    beforeEach(async () => {});
    afterEach(async () => {
      await deletePost(post.id);
    });
    test('It returns 200 response', async () => {
      const mockReq = httpMocks.createRequest<NextApiRequest>({
        query: {
          id: user.id,
        },
        body: {
          title: 'タイトル',
          content: 'コンテント',
          rating: 1,
          color: 'a',
        },
      });
      const mockRes = httpMocks.createResponse<NextApiResponse>();
      await handler(mockReq, mockRes);
      expect(mockRes.statusCode).toEqual(200);
      post = JSON.parse(mockRes._getData());

      expect(post.authorId).toBe(user.id);
    });
  });
});
