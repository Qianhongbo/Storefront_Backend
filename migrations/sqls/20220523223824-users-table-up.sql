CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL
);