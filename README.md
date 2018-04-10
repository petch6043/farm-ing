This project use node.js as the backend sever, mySQL as the database, and react.js as the front end.

## How to run our app

1. install node.js, you also need to have MySQL server and Apache server (we use MAMP)

2. create the database name `react_sql` in the MySQL server

3. import file `./farm_ing/farm_ing_database.sql` into the database `react_sql`

4. change directory to the folder you stored the folder farm-ing and install backend dependencies 
```sh
cd farm-ing
npm install
```

5. execute index.js(backend app) in the command prompt (you can also use nodemon)
```sh
node index.js
```

6. go to `localhost:4000` in your browser, if it is connected you will see the message "hello from the farm-ing server!"

7. change directory to the folder term which is inside the folder farm-ing and issue npm install install frontend dependencies 
```sh
cd farm-ing/term
npm install
```

8. start the react app
```sh
npm start
```

9. it will automatically redirect you to `localhost:3000` in your browser(Chrome is reccomended) and welcome to our web application!
