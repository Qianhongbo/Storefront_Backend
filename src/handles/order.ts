import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'

const store = new OrderStore();

// * get all the orders
const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

// show one specific record
const show = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
}

// * create an order
// need to put the details in the request body
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      product_id: req.body.product_id as number,
      quantity: req.body.quantity as number,
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
  const deleted = await store.delete(parseInt(req.params.id))
  res.json(deleted)
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
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.put('/orders/update', verifyAuthToken, change);
}

export default order_routes;