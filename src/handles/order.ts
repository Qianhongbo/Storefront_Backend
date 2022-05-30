import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore();

// * get all the orders
const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

// show one specific record
const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
}

// * create an order
// need to put the details in the request body
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
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
  const deleted = await store.delete(req.params.id)
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

const order_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders/:id', destroy);
  app.put('/orders/update', change);
}

export default order_routes;