/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const request = require('supertest');
const delay = require('../utils/delay');
const { ITEM_SUCCESSFULLY_ADDED, ITEM_DELETED_SUCCESSFULLY } = require('../utils/constants');

const baseURL = 'http://localhost:3000';

jest.setTimeout(50000);

describe('/stack', () => {
  it('POST stack/ | should add \'Hello\' to stack', async () => {
    const response = await request(baseURL).post('/stack/push').send({
      element: 'Hello',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(ITEM_SUCCESSFULLY_ADDED);
  });

  it('POST stack/ | should add \'World\' to stack', async () => {
    const response = await request(baseURL).post('/stack/push').send({
      element: 'World',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(ITEM_SUCCESSFULLY_ADDED);
  });

  it('GET stack/ | should return \'World\' from stack', async () => {
    const response = await request(baseURL).get('/stack');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ element: 'World' });
  });

  it('POST stack/ | should add \'Again\' to stack', async () => {
    const response = await request(baseURL).post('/stack/push').send({
      element: 'Again',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(ITEM_SUCCESSFULLY_ADDED);
  });

  it('GET stack/ | should return \'Again\' from stack', async () => {
    const response = await request(baseURL).get('/stack');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ element: 'Again' });
  });

  it('GET stack/ | should return \'Hello\' from stack', async () => {
    const response = await request(baseURL).get('/stack');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ element: 'Hello' });
  });

  it('GET stack/ | should return null', async () => {
    const response = await request(baseURL).get('/stack');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ element: null });
  });
});

describe('/cache', () => {
  it('POST cache/ | should add {key: name, value: John} to cache', async () => {
    const response = await request(baseURL).post('/cache/push').send({
      key: 'name',
      value: 'John',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(ITEM_SUCCESSFULLY_ADDED);
  });

  it('GET cache/ | should return cache item by name key', async () => {
    const response = await request(baseURL).get('/cache/name');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ cacheItem: 'John' });
  });

  it('GET cache/ | should return cache item by age key', async () => {
    const response = await request(baseURL).get('/cache/age');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ cacheItem: null });
  });

  it('POST cache/ | should add {key: name, value: Larry} to cache', async () => {
    const response = await request(baseURL).post('/cache/push').send({
      key: 'name',
      value: 'Larry',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(ITEM_SUCCESSFULLY_ADDED);
  });

  it('GET cache/ | should return cache item by name key', async () => {
    const response = await request(baseURL).get('/cache/name');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ cacheItem: 'Larry' });
  });

  it('GET cache/ | should return cache item by name key after TTL', async () => {
    await delay(30);
    const response = await request(baseURL).get('/cache/name');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ cacheItem: null });
  });

  it('POST cache/ | should add {key: age, value: 28} to cache', async () => {
    const response = await request(baseURL).post('/cache/push').send({
      key: 'age',
      value: 28,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(ITEM_SUCCESSFULLY_ADDED);
  });

  it('GET cache/ | should return cache item by age key', async () => {
    const response = await request(baseURL).get('/cache/age');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ cacheItem: 28 });
  });

  it('DELETE cache/ | should delete cache item by age key', async () => {
    const response = await request(baseURL).delete('/cache/age');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(ITEM_DELETED_SUCCESSFULLY);
  });

  it('GET cache/ | should return cache item by age key', async () => {
    const response = await request(baseURL).get('/cache/age');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ cacheItem: null });
  });
});
