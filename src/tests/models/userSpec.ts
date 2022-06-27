import { User, UserStore } from '../../models/user';

const store = new UserStore()

const u: User = {
  first_name: 'user',
  last_name: 'test',
  password: '123456'
};

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create(u);
    expect(result.first_name).toEqual('user');
    expect(result.last_name).toEqual('test');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result[0].first_name).toEqual('user');
    expect(result[0].last_name).toEqual('test');
  });

  it('show method should return the target users', async () => {
    const result = await store.show(2);
    expect(result.first_name).toEqual('user');
    expect(result.last_name).toEqual('test');
  });

  it('delete method should remove the user', async () => {
    await store.delete(2);
    const result = await store.index()

    expect(result).toEqual([]);
  });
});