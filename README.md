# LifeStat

FRONTEND

- Go to the project frontend folder and install react-app:
  `npm i`
- Install react-router-dom:
  `npm install react-router-dom`

- Install react-pro-sidebar:
  `npm install react-pro-sidebar`

- Install Material UI:
  `npm install @mui/material @emotion/react @emotion/styled`

- Install Material UI Icons:
  `npm install @mui/icons-material`

- Install D3 library
  `npm install d3`

- Install d3-delaunay@6
  `npm install d3-delaunay@6`

- Install Observable standard library
  `npm i @observablehq/stdlib`

- Install Material UI
  `npm install @material-ui/core`

- Install jwt-decode
  `npm i jwt-decode`

- using for oura fetch
  CORS PROXY
  https://cors-anywhere.herokuapp.com/corsdemo

importScripts("${require.resolve("d3-delaunay@6")}");

BACKEND

- `npm init - y`
- `npm install dotenv express-validator jsonwebtoken bcrypt uuid cors helmet express-rate-limit`
- `npm install sequelize`
  PostgreSQL Client
- `npm install pg`

BEFORE RUNNING BACKEND SERVER - DATABASE STEPS:

- create database lifestat;
- \c lifestat
- grant all on schema public to db_lifestat_user;
- GRANT CREATE ON DATABASE lifestat TO db_lifestat_user;
- create extension if not exists "uuid-ossp";
- Seed Categories and Sources

Generate .env file:
access token
refresh token
