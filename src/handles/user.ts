import express, { NextFunction, Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'

const store = new UserStore();

// get all the users
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
};

// show one specific user
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// create an user
// need to put the details in the request body
const create = async (req: Request, res: Response) => {
  // check the input including all the information we need
  if (req.body.first_name === undefined ||
    req.body.last_name === undefined ||
    req.body.password === undefined) {
    res.status(400);
    res.json("Have to post first_name, last_name and password!")
    return;
  }
  
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  }

  try {
    const newUser = await store.create(user)
    const theToken = process.env.TOKEN_SECRET as string;
    var token = jwt.sign({ user: newUser }, theToken);
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

// delete an user
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id))
    res.json(deleted)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  }
  try {
    const u = await store.authenticate(user);
    const theToken = process.env.TOKEN_SECRET as string;
    var token = jwt.sign({ user: u }, theToken);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
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

const user_routes = (app: express.Application) => {
  app.get('/users',  verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/register', create);
  app.delete('/users/:id',  verifyAuthToken, destroy);
  app.post('/users/authenticate', authenticate);
}

export default user_routes;