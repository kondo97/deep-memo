import { User, Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';
import { createUser } from '../__test__/factories/user/createUser';
import { deleteUser } from '../__test__/factories/user/deleteUser';
import handler from '../pages/api/getAllPosts';
import { createAllPost } from './factories/create/createAllPosts';
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
  describe('When user is not logged in.', () => {
    let posts: Post[];
    beforeEach(async () => {
      posts = await createAllPost(user.id);
    });
    afterEach(async () => {
      await deletePost(posts[0].id);
    });
    test('It returns 200 response', async () => {
      const mockReq = httpMocks.createRequest<NextApiRequest>({
        query: {
          id: user.id,
        },
      });
      const mockRes = httpMocks.createResponse<NextApiResponse>();
      await handler(mockReq, mockRes);
      expect(mockRes.statusCode).toEqual(200);
      expect(JSON.parse(mockRes._getData())[0].id).toBe(posts[0].id);
    });
  });
});