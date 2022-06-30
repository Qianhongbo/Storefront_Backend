import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
describe('Test product endpoint responses', () => {
  var adminAuthToken: string;

  beforeAll(async () => {
    const response = await request.post('/users/register')
      .send({
        first_name: 'Klay',
        last_name: 'Thompson',
        password: '123456'
      });
    adminAuthToken = response.body as string;
  })

  it('create endpoint should create a product', async () => {
    const response = await request.post('/products')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .send({
        name: 'MacBookPro2021',
        price: 2499,
        category: 'laptop'
      })
      .expect(200)
    expect(response.body.name).toEqual('MacBookPro2021');
    expect(response.body.price).toEqual(2499);
    expect(response.body.category).toEqual('laptop');
  });

  it('create endpoint should return 400 if the input is not complete', async () => {
    const response = await request.post('/products')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .send({
        name: 'test',
      }).expect(400);
  });

  it('index endpoint should return a list of product', async () => {
    const response = await request.get('/products')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body[0].name).toEqual('MacBookPro2021');
    expect(response.body[0].price).toEqual(2499);
    expect(response.body[0].category).toEqual('laptop');
  });

  it('show endpoint should return a product', async () => {
    const response = await request.get('/products/2')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body.name).toEqual('MacBookPro2021');
    expect(response.body.price).toEqual(2499);
    expect(response.body.category).toEqual('laptop');
  });

  it('select by category endpoint should return the target product', async () => {
    const response = await request.get('/products/category/laptop')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body[0].name).toEqual('MacBookPro2021');
    expect(response.body[0].price).toEqual(2499);
    expect(response.body[0].category).toEqual('laptop');
  });

  it('delete endpoint should delete the user', async () => {
    const response = await request.delete('/products/2')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await request.delete('/users/2')
      .set('Authorization', `Bearer ${adminAuthToken}`);
  });

});