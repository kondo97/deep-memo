import { User, Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';
import handler from '../pages/api/delete';
import { createPost } from './factories/create/createPost';
import { deletePost } from './factories/create/deletePosts';
import { createUser } from './factories/user/createUser';
import { deleteUser } from './factories/user/deleteUser';

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
      test('It returns 200 response', async () => {
        const mockReq = httpMocks.createRequest<NextApiRequest>({
          query: {
            sessionId: user.id,
            postId: post.id,
          },
        });
        const mockRes = httpMocks.createResponse<NextApiResponse>();
        await handler(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(200);
        const res = JSON.parse(mockRes._getData());
        expect(res.id).toBe(post.id);
      });
    });
  });
});
