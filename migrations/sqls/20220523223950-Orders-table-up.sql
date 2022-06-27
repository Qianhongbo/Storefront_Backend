CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(15)
);