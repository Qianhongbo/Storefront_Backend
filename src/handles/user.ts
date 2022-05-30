import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'

const store = new UserStore();

// get all the users
const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

// show one specific user
const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
}

// create an user
// need to put the details in the request body
const create = async (req: Request, res: Response) => {
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
  const deleted = await store.delete(req.params.id)
  res.json(deleted)
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  }
  try {
    const u = await store.authenticate(req.body.firstName, req.body.lastName, req.body.password);
    const theToken = process.env.TOKEN_SECRET as string;
    var token = jwt.sign({ user: u }, theToken);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
}

const user_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users/register', create);
  app.delete('/users/:id', destroy);
  app.post('/users/authenticate', authenticate);
}

export default user_routes;