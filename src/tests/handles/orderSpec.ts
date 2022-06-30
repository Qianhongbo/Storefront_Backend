import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
describe('Test order endpoint responses', () => {
  var adminAuthToken: string;

  beforeAll(async () => {
    const response = await request.post('/users/register')
      .send({
        first_name: 'Draymond',
        last_name: 'Green',
        password: '123456'
      });
    adminAuthToken = response.body as string;

    await request.post('/products')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .send({
        name: 'MacBookPro2021',
        price: 1999,
        category: 'laptop'
      })
  })

  it('create endpoint should create an order', async () => {
    const response = await request.post('/orders')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .send({
        user_id: 1,
        status: 'active'
      })
      .expect(200)
    expect(response.body.user_id).toEqual(1);
    expect(response.body.status).toEqual('active');
  });

  it('index endpoint should return a list of orders', async () => {
    const response = await request.get('/orders')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body).toEqual(
      [
        {
          id: 1,
          user_id: 1,
          status: 'active'
        }
      ]
    )
  });

  it('show endpoint should return an order', async () => {
    const response = await request.get('/orders/1')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body.user_id).toEqual(1);
    expect(response.body.status).toEqual('active');
  });

  it('getOrdersByUserId endpoint should return a list of orders', async () => {
    const response = await request.get('/orders/user/1')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body[0].user_id).toEqual(1);
    expect(response.body[0].status).toEqual('active');
  });

  it('update endpoint should change an order', async () => {
    const response = await request.put('/orders/update')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .send({
        order_id: 1,
        status: 'closed'
      })
      .expect(200);
    expect(response.body.user_id).toEqual(1);
    expect(response.body.status).toEqual('closed');
  });

  it('create endpoint should create an order_product', async () => {
    const response = await request.post('/orders/order-product')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .send({
        order_id: 1,
        product_id: 1,
        quantity: 3
      })
      .expect(200)
    expect(response.body.order_id).toEqual(1);
    expect(response.body.product_id).toEqual(1);
    expect(response.body.quantity).toEqual(3);
  });

  it('index endpoint should return a list of order_products', async () => {
    const response = await request.get('/orders/order-product/1')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
    expect(response.body).toEqual([
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 3
      }
    ])
  });

  it('update endpoint should change an order_product', async () => {
    const response = await request.put('/orders/order-product/update')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .send({
        order_id: 1,
        product_id: 1,
        quantity: 5
      })
      .expect(200);
    expect(response.body.order_id).toEqual(1);
    expect(response.body.product_id).toEqual(1);
    expect(response.body.quantity).toEqual(5);
  });

  it('delete endpoint should delete the order_product', async () => {
    await request.delete('/orders/order-product/1')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
  });

  it('delete endpoint should delete the order', async () => {
    await request.delete('/orders/1')
      .set('Authorization', `Bearer ${adminAuthToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await request.delete('/users/1')
      .set('Authorization', `Bearer ${adminAuthToken}`);

    await request.delete('/products/1')
      .set('Authorization', `Bearer ${adminAuthToken}`);
  });

});