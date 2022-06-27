# Record of the process

## Add dependencies

- `sudo npm i db-migrate`
- `sudo npm i db-migrate-pg`
- `sudo npm i --save-dev dotenv`

## Create environment variable

Create the `.env` file and some secrete variables.
Add this file to `.gitignore` list.

## Create `src/database.ts`

This is file is used to configure the database.

## Create `database.json`

This file is used by migration.

## Create Docker container

After we have configured the database, we can use `docker-compose up` to create the docker container.

## Create migration folder

```
db-migrate create users-table --sql-file
db-migrate create Products-table --sql-file
db-migrate create Orders-table --sql-file
db-migrate create order-products-table --sql-file
```

