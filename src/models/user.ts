// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
        // @ts-ignore
      const conn = await Client.connect();
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltRounds = process.env.SALT_ROUNDS as string;
      console.log(u.password)
      console.log(pepper)
      console.log(parseInt(saltRounds))
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds)
      );
      console.log(u.first_name);
      console.log(u.last_name);
      console.log(hash);
      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      // console.log(result.rows[0].firstname)
      // console.log(result.rows[0].lastname )
      // console.log(result.rows[0].password)
      const user = result.rows[0];
      console.log(user.firstname)
      console.log(user.lastname)
      console.log(user.password)
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.first_name} ${u.last_name}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = "SELECT password FROM users where fistName=($1) AND lastName=($2)";
    const result = await conn.query(sql, [firstName, lastName]);
    const pepper = process.env.BCRYPT_PASSWORD;

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}