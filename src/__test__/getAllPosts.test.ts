import { User, Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';
import { createUser } from '../__test__/factories/user/createUser';
import { deleteUser } from '../__test__/factories/user/deleteUser';
import handler from '../pages/api/getAllPosts';
import { createAllPosts } from './factories/create/createAllPosts';
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
    let posts: Post[];
    beforeEach(async () => {
      posts = await createAllPosts(user.id);
    });
    afterEach(async () => {
      await deletePost(posts[0].id);
    });
    test('It returns 200 response', async () => {
      const mockReq = httpMocks.createRequest<NextApiRequest>({
        query: {
          id: user.id,
          skip: 0,
          order: 'スター(昇順)'
        },
      });
      const mockRes = httpMocks.createResponse<NextApiResponse>();
      await handler(mockReq, mockRes);
      expect(mockRes.statusCode).toEqual(200);
      console.log(JSON.parse(mockRes._getData()).posts.length);
      expect(JSON.parse(mockRes._getData()).posts[0].id).toBe(posts[0].id);
    });
  });
});
