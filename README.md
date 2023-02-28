# Example API

A simple HTTP API that listens on port 80 and stores data in a MySQL DB.

## Endpoints

### `GET /numbers`

Returns a list of numbers.

Response body:
```
[ 23, 42 ]
```

### `GET /addnumber/<num>`

Adds `<num>` to the list of numbers.

## Requirements

* Base system
  * nodejs v16
  * npm
* MySQL/MariaDB database
  * Provide database details as environment variables `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## Installation / run instructions

* Install dependencies

> npm install

* Create database tables from file tables.sql

* Make sure no issues remain with delint

> npm run lint

* Run server (requires environment variables as above)

> npm run start
