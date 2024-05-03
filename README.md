# GA Software Engineering Immersive: Project 4

# LifeStat app

**Context:**

**What:**

## Technologies Used

![PostgreSQL](/public/postgreSQL.png)
![Express](/public/express.png)
![React](/public/react.png)
![Node.js](/public/node.js.png)
![JS](/public/js.png)
![HTML5](/public/html5.png)
![CSS](/public/css.png)
![npm](/public/npm.png)
![Material UI](/public/material_ui.png)
![Postman](/public/postman.png)

## Getting Started

### Postman Collection

### Backend Configuration

- Go to the project backend folder and create a new package.json file

`npm init - y`

- Install the packages:

`npm i dotenv express-validator jsonwebtoken bcrypt uuid cors helmet express-rate-limit sequelize pq`

- **dotenv:** A package used to load environment variables from a .env file into process.env.
- **Express-validator:** A set of middleware functions to validate input data in Express.js applications.
- **mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straight-forward, schema-based solution to model application data.
- **Jsonwebtoken:** A library to create and verify JSON Web Tokens (JWT) for secure communication between parties.
- **bcrypt:** A library to help hash passwords securely.
- **Uuid:** A package to generate universally unique identifiers (UUIDs).
- **Cors:** A package to enable CORS (Cross-Origin Resource Sharing) in Express.js applications, allowing controlled access to resources from other domains.
- **Helmet:** A package to secure Express.js apps by setting various HTTP headers.
- **Express-rate-limit:** A middleware to limit repeated requests to your API to protect against abuse and improve stability.
- **Sequelize:** An ORM (Object-Relational Mapping) library for Node.js, providing easy access to PostgreSQL databases by mapping database entries to JavaScript objects.
- **PostgreSQL (pg):** A powerful open-source relational database management system, used for handling structured data with advanced features such as ACID compliance and support for complex queries.

#### Database Setup steps (before running backend server):

- Open terminal and run
- Install PostgreSQL (I am using Homebrew Package manager) `brew install postgresql@15`
- Download and install pgadmin (check the version for your OS)
  `https://www.postgresql.org/ftp/pgadmin/pgadmin4/v8.5/macos/`
- Check if service is running `Brew services list`
  - If not just start the service `brew services start postgresql@15`
- Run `psql postgres`
  - if you can't get into postgres cd into root `cd ~`
  - Get the postgre path `cat .zshrc`
  - Check if it is listing the PATH for postgresql like the example: `export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"`
  - If not run `Nano .zshrc`
  - Add the PATH (if not this one check the directories that lead to it so you can get the exact path) `export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"`
- Create database `create database lifestat;`
- Connect to database `\c lifestat`
- Grant permission on schema `grant all on schema public to db_lifestat_user;`
- Grant create permission `grant create on database lifestat to db_lifestat_user;`
- We are using UUID on each table so create extension `create extension if not exists "uuid-ossp";`
- Run backend server (tables will be created automatically, according to Models): `npm run dev`
- Run Seeding (postman) for Categories and Sources to automatically create the initial records, respectively.

- Create your .env and add the database path (like below for localhost)

  `DATABASE=postgres://db_lifestat_user:<YOUR_DB_USER_PASSWORD>@localhost:5432/lifestat`

  `ACCESS_SECRET=<YOUR_ACCESS_SECRET>`

  `REFRESH_SECRET=<YOUR_REFRESH_SECRET>`

  **NOTE:** We've generated our ACCESS and REFRESH secrets using https://www.random.org/strings/

### Frontend Configuration

- Get your personal access token at:

  - https://cloud.ouraring.com/docs/API

- Create .env file and add the following:

  `VITE_OURA_API_SLEEP_URL=https://cloud.ouraring.com/v2/usercollection/daily_sleep`

  `VITE_OURA_API_SLEEP_URL=https://api.ouraring.com/v2/usercollection/sleep`

  `VITE_OURA_API_KEY==<YOUR_PERSONAL_ACCESS_TOKEN>`

  `VITE_SERVER=http://localhost:5002`

- Install the packages:

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

  - Oura API requires CORS for fetching data so you can access this link and request temporary access to this demo server:
    `https://cors-anywhere.herokuapp.com/corsdemo`

## Features

### Login & Registration

## Some Interesting stuff...

## Next Steps

- Forgot my password feature on Login
