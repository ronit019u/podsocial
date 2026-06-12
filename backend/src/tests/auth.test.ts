// src/tests/auth.test.ts
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import { app } from '../index.js';

describe('Auth', () => {
  it('Test api/auth/register', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@gmail.com',
      password: '123456',
    });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.user.email).toBe('test@gmail.com');
  });

  it('should login a user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'test@gmail.com',
      password: '123456',
    });

    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });
});
