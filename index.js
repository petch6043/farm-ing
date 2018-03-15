const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

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
	res.send('hello from the products server')

});	

app.get('/products/add', (req, res) =>{
	const { piggy, pig, piggyback, pi} = req.query;
	console.log(req.query);
	console.log(piggy);
	const INSERT_PRODUCTS_QUERY = 'INSERT INTO products (piggy, pig, piggyback, pi) VALUES('+piggy+', '+pig+', '+piggyback+', '+pi+')';
	connection.query(INSERT_PRODUCTS_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('ADDED')
		}
	});
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

app.listen(4000, () => {
	console.log('Products server listening on port 4000')


});

