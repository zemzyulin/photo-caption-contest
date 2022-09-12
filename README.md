## Codecademy's NodeJS Path: *Photo Caption Contest* Project

### Short description
__Project Title:__ Photo Caption Contest
__Description:__ Node/Express API to manage a simple photo caption contest
Users can view, edit photos, captions and their accounts. Authorization is managed with JWT. Data is stored in PostgreSQL DB via Sequelize ORM. App uses in-memory cache to improve its efficiency.

This app was initialized with express-generator.
__User can:__
- Authorize in order to obtain JWT token
- Create, read, update and delete their account
- Create, read, update and delete captions
- Create, read, update and delete photos
- Corresponding actions require authorization

### Features
1. Complete system of routes to handle all requests from front-end
2. Data is stored/retrieved from PostgreSQL database via Sequelize ORM
3. Input validation and sanitization for all requests
4. Authorization is managed by jsonwebtoken
5. App utilizes in-memory cache via node-cache
6. Available on the web via Heroku

__How to use on web__
https://photo-caption-contest-yz.herokuapp.com/  
__Swagger documentation on web__
https://photo-caption-contest-yz.herokuapp.com/docs/

<ins>__Technology:__ JavaScript, Node.js, Express, PostgreSQL, Sequelize, JWT, Node-Cache, Heroku</ins>
<br>
<br>

### How to run locally
Install project dependencies using `npm install`

Before you can run the project locally, you will need to setup the database:
```
psql postgres --u postgres

postgres-# CREATE ROLE master WITH LOGIN PASSWORD 'h@rdest_Pa55';
postgres-# ALTER ROLE master CREATEDB;
postgres-# \q

psql postgres -U master

postgres=> CREATE DATABASE photo_caption_contest;
postgres=> GRANT ALL PRIVILEGES ON DATABASE photo_caption_contest TO master;
postgres=> \q
```

Run the Sequelize migration scripts using `sequelize db:migrate`
You can then run the project with `npm start`
Once the app is running locally, you can access the API at `http://localhost:3000/`


### Test with Swagger
Documentation and testing available at `http://localhost:3000/docs`

__Additional info on main routes for testing:__  
 - Retrieve users using `GET /users`
 - Create a new user using `POST /users`
 - Login as new user using `POST /users/login`
 - Authorize Swagger requests
   - Copy token returned from login
   - Click the Authorize button at the top
   - Paste in the auth token
   - Click Login.
 - Retrieve a single user using `GET /users/{id}`
 - Create a caption using `POST /captions`
 - Create, read, update, delete photos, captions and users data using other endpoints.
   - endpoints with a Lock icon require a login token


<br>
<br>

Best regards,  
Yehor Zemzyulin