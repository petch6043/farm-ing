const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';
const SELECT_ALL_PENCOUNT_QUERY = 'SELECT * FROM pen_count';

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

app.get('/pencount', (req, res) =>{
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

app.get('/pencount/update', (req, res) =>{
	const { added, date} = req.query;
	console.log(req.query);
	const UPDATE_PIGCOUNT_QUERY = "UPDATE Pen_count SET added = "+added+" WHERE date = '"+date+"'";
	connection.query(UPDATE_PIGCOUNT_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('UPDATED')
		}
	});
});


app.listen(4000, () => {
	console.log('Products server listening on port 4000')


});

