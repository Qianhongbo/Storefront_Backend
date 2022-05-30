import { User, UserStore } from '../../models/user';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const store = new UserStore()

const u = {
  first_name: 'Maverick',
  last_name: 'Qian',
  password: '980620'
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

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
    expect(result.first_name).toEqual('Maverick');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    // expect(result[0].firstName).toEqual('Maverick');
    // expect(result[0].lastName).toEqual('Qian');
    // expect(result[0].password).toEqual(hash);
  });

  // it('show method should return the correct user', async () => {
  //   const result = await store.show("1");
  //   expect(result).toEqual({
  //     id: 1,
  //     firstName: 'Maverick',
  //     lastName: 'Qian',
  //     password: hash
  //   });
  // });

  // it('delete method should remove the user', async () => {
  //   store.delete("1");
  //   const result = await store.index()

  //   expect(result).toEqual([]);
  // });
});