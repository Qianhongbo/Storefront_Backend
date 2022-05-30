CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    user_id bigint REFERENCES users(id),
    status VARCHAR(15)
);