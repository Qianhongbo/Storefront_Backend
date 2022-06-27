# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Users

1. Index
   - Method - GET
   - Authorization required - Bearer
   - Parameters - none
   - Usage - list all users
   - http://localhost:3000/users

2. Show
   - Method - GET
   - Authorization required - Bearer
   - Parameters - id
   - Usage - return a specific User
   - http://localhost:3000/users/:id

3. Create
   - Method - POST
   - Authorization required - No
   - Parameters - first_name, last_name, password
   - Usage - create a new User
   - http://localhost:3000/users/register

4. Delete
   - Method - DELETE
   - Authorization required - Bearer
   - Parameters - none
   - Usage - Delete an exciting User
   - http://localhost:3000/users/:id

#### Products

1. Index
   - Method - GET
   - Authorization required -No
   - Parameters - none
   - Usage - list all products
   - http://localhost:3000/products

2. Show
   - Method - GET
   - Authorization required - No
   - Parameters - none
   - Usage - return a specific product
   - http://localhost:3000/products/:id

3. Create
   - Method - POST
   - Authorization required - Bearer
   - Parameters - name, price, category
   - Usage - create a new product
   - http://localhost:3000/products

4. Delete
   - Method - DELETE
   - Authorization required - Bearer
   - Parameters - id
   - Usage - Delete an exciting product
   - http://localhost:3000/products/:id
5. Select By Category
   - Method - GET
   - Authorization required - Bearer
   - Parameters - none
   - Usage - Select products via category
   - http://localhost:3000/products/category/:category

#### Orders

1. Index
   - Method - GET
   - Authorization required - Bearer
   - Parameters - none
   - Usage - list all orders
   - http://localhost:3000/orders

2. Show
   - Method - GET
   - Authorization required - Bearer
   - Parameters - none
   - Usage - list a specific order
   - http://localhost:3000/orders/:id

3. Create
   - Method - POST
   - Authorization required - Bearer
   - Parameters - product_id, quantity, user_id, status
   - Usage - create a new order
   - http://localhost:3000/orders

4. Delete
   - Method - DELETE
   - Authorization required - Bearer
   - Parameters - none
   - Usage - Delete an exciting order
   - http://localhost:3000/orders/:id

5. Update
   - Method - PUT
   - Authorization required - Bearer
   - Parameters - id, status
   - Usage - edit an exciting order
   - http://localhost:3000//orders/update

## Data Shapes
#### User
```sql
CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL
);
```

#### Product

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(50)
);
```

#### Orders

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(15)
);
```
