const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const SELECT_ALL_PENCOUNT_QUERY = 'SELECT * FROM transfer';

const SELECT_ALL_FOOD_QUERY = 'SELECT * FROM food';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'react_sql',
	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//console.log(connection);

app.use(cors());

app.get('/',(req,res) => {
	res.send('hello from the farm-ing server!')

});	


app.get('/products', (req, res) =>{
	connection.query(SELECT_ALL_PRODUCTS_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

app.get('/transfer', (req, res) =>{
	connection.query(SELECT_ALL_PENCOUNT_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});
app.get('/food', (req, res) =>{
	connection.query(SELECT_ALL_FOOD_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

app.get('/food/add', (req, res) =>{
	var pen_id = 1;
	var amount = 2;
	var food_type = 3;
	var user_id = 4;
	console.log(req.query);
	const INSERT_food_QUERY = 'INSERT INTO food (pen_id, amount,food_type ,user_id) VALUES('+pen_id+', '+amount+','+food_type+' ,'+user_id+')';
	connection.query(INSERT_food_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('food ADDED')
		}
	});
});


app.get('/products/add', (req, res) =>{
	const { name, price} = req.query;
	console.log(req.query);
	console.log(name);
	const INSERT_PRODUCTS_QUERY = 'INSERT INTO products (name, price) VALUES('+name+', '+price+')';
	connection.query(INSERT_PRODUCTS_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('ADDED')
		}
	});
});

app.get('/transfer/add/', (req, res) =>{
	var type = 'add';
	var pen_id = 1;
	var user_id = 2;
	var value = 3;
	const INSERT_PRODUCTS_QUERY = 'INSERT INTO transfer (type, pen_id, user_id, value) VALUES("'+type+'", '+pen_id+', '+user_id+', '+value+')';
	connection.query(INSERT_PRODUCTS_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('ADDED')
		}
	});
});


app.listen(4000, () => {
	console.log('Products server listening on port 4000')


});

