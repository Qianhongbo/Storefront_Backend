import express, { NextFunction, Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'

const store = new ProductStore();

// * get all the records
const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400)
    res.json(err)
  }

};

// * show one specific record
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// * create an record
// need to put the details in the request body
const create = async (req: Request, res: Response) => {
  // check the input including all the information we need
  if (req.body.name === undefined ||
    req.body.price === undefined) {
    res.status(400);
    res.json("Have to post name and price!")
    return;
  }

  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// * delete a record
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id))
    res.json(deleted)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// * select by categoty
const selectByCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.selectByCategory(req.params.category);
    res.json(products);
  } catch (err) {
    res.status(400)
    res.json(err)
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

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
  app.get('/products/category/:category', selectByCategory);
}

export default product_routes;