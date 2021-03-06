# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Basic

- Runtime: Node.js 
- Web application framework: Express
- Language: TypeScript
- Database: Postgres
- Testing: Jasmine

## Package installation

```bash
npm install
```

## Docker setup

```bash
docker-compose up
```

## Create database

Create the database in PostgreSQL database.

```sql
create database storefront_dev;
```

## Database migration

```bash
db-migrate up
db-migrate down
```

## Run the program

```bash
npm run start
```

## Test the program with Jasmine

```bash
npm run test
```

## Ports

```
express port: localhost:3000
docker port: localhost:5432
```

## `.env`

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB_DEV=storefront_dev
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=Maverick
POSTGRES_PASSWORD=zxcvbnm
ENV=dev
BCRYPT_PASSWORD=speak-friend-and-enter
SALT_ROUNDS=10
TOKEN_SECRET=qwerdf
```

