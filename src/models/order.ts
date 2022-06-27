// @ts-ignore
import Client from '../database'

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async addOrder(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [o.user_id, o.status])
      const order: Order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add order ${o.user_id}: ${err}`)
    }
  }

  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async getOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [user_id])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not find order of user ${user_id}. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async update(orderId: number, status: string): Promise<Order> {
    try {
      const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [status, orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${orderId}. Error: ${err}`);
    }
  }

  // get all the order_products rows with a specific order_id
  async indexOrderProductsByOrderId(order_id: number): Promise<OrderProduct[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM order_products WHERE order_id=$1';
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order_products. Error: ${err}`)
    }
  }

  async createOrderProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [op.order_id, op.product_id, op.quantity]);
      conn.release();
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add product. Error: ${err}`)
    }
  }

  async deleteOrderProductByOrderId(order_id: number): Promise<OrderProduct> {
    try {
      const sql = 'DELETE FROM order_products WHERE order_id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [order_id])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not delete order_products ${order_id}. Error: ${err}`);
    }
  }

  async updateOrderProduct(order_id: number, product_id: number, quantity: number): Promise<OrderProduct> {
    try {
      const sql = 'UPDATE order_products SET quantity=$1 WHERE order_id=$2 AND product_id=$3 RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${order_id} product ${product_id}. Error: ${err}`);
    }
  }

}
