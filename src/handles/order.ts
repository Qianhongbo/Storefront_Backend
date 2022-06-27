import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderProduct, OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'

const store = new OrderStore();

// * get all the orders
const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
};

// * show a specific order
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// * get all the orders of an user
const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const product = await store.getOrdersByUserId(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// * create an order
// need to put the details in the request body
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id as number,
      status: req.body.status as string,
    };

    const newOrder = await store.addOrder(order);
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// * delete an order
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id))
  res.json(deleted)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// * change an order
const change = async (req: Request, res: Response) => {
  try {
    const result = await store.update(
      parseInt(req.body.order_id),
      req.body.status
    );
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

// * create an order_product
const createOrderProduct = async (req: Request, res: Response) => {
  try {
    const op: OrderProduct = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    const result = await store.createOrderProduct(op);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const indexOrderProductsByOrderId = async (req: Request, res: Response) => {
  try {
    const result = await store.indexOrderProductsByOrderId(parseInt(req.params.order_id));
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

const deleteOrderProductByOrderId = async (req: Request, res: Response) => {
  try {
    const result = await store.deleteOrderProductByOrderId(parseInt(req.params.order_id));
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const result = await store.updateOrderProduct(
      req.body.order_id,
      req.body.product_id,
      req.body.quantity
    );

    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
    return;
  }
}

const order_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.get('/orders/user/:id', verifyAuthToken, getOrdersByUserId);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.put('/orders/update', verifyAuthToken, change);
  // order_products
  app.get('/orders/order-product/:order_id', verifyAuthToken, indexOrderProductsByOrderId);
  app.post('/orders/order-product', verifyAuthToken, createOrderProduct);
  app.delete('/orders/order-product/:order_id', verifyAuthToken, deleteOrderProductByOrderId);
  app.put('/orders/order-product/update', verifyAuthToken, updateOrderProduct);
}

export default order_routes;