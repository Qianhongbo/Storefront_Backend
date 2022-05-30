import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from './handles/user';
import product_routes from './handles/product';
import order_routes from './handles/order';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
})

user_routes(app);

product_routes(app);

order_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
