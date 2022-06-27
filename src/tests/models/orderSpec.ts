import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore

const u: User = {
  first_name: 'order',
  last_name: 'test',
  password: '123456'
};

const p: Product = {
  name: 'iphone',
  price: 1000,
  category: 'phone'
};

const o: Order = {
  product_id: 1,
  quantity: 1000,
  user_id: 1,
  status: 'active'
};

describe("Order Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.addOrder).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a order', async () => {
    await userStore.create(u);
    await productStore.create(p);
    const result = await store.addOrder(o);
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 1000,
      user_id: 1,
      status: 'active'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      product_id: 1,
      quantity: 1000,
      user_id: 1,
      status: 'active'
    }]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 1000,
      user_id: 1,
      status: 'active'
    });
  });

  it('update method should change the order', async () => {
    const result = await store.update(1, 'closed');
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 1000,
      user_id: 1,
      status: 'closed'
    });
  });

  it('delete method should remove the order', async () => {
    store.delete(1);
    userStore.delete(1);
    productStore.delete(1);

    const result = await store.index()

    expect(result).toEqual([]);
  });

});