import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Product } from '../../models/product';

interface JwtDecoded {
  user: User;
  iat: number;
};

let adminAuthToken: string;

const request = supertest(app);
describe('Test user endpoint responses', () => {

  it('create endpoint should create a user', async () => {
    const response = await request.post('/users/register')
      .send({
        first_name: 'Stephen',
        last_name: 'Curry',
        password: '123456'
      })
      .expect(200)
    adminAuthToken = response.body;
    const token = response.body as string;
    const decoded = jwt.decode(token) as JwtDecoded;
    expect(decoded.user.first_name).toEqual('Stephen');
    expect(decoded.user.last_name).toEqual('Curry');
  });

  it('create endpoint should return 400 if the input is not complete', async () => {
    const response = await request.post('/users/register')
      .send({
        first_name: 'Stephen',
      })
      .expect(400);
  });

  it('authenticate endpoint should return the token', async () => {
    const response = await request.post('/users/authenticate')
      .send({
        first_name: 'Stephen',
        last_name: 'Curry',
        password: '123456'
      })
      .expect(200);
  });

  it('index endpoint should return a list of product', async () => {
    const response = await request.get('/users')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body[0].first_name).toEqual('Stephen');
    expect(response.body[0].last_name).toEqual('Curry');
  });

  it('show endpoint should return a user', async () => {
    const response = await request.get('/users/3')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body.first_name).toEqual('Stephen');
    expect(response.body.last_name).toEqual('Curry');
  });

  it('delete endpoint should delete the user', async () => {
    await request.delete('/users/3')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
  });


});