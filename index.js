const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';
const SELECT_ALL_PENCOUNT_QUERY = 'SELECT * FROM pen_count';
const SELECT_ALL_VACCINE_QUERY = 'SELECT * FROM vaccine';
const SELECT_ALL_VACCINEPEN_QUERY = 'SELECT * FROM vaccine_pen';
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


app.get('/vaccine', (req, res) =>{
	connection.query(SELECT_ALL_VACCINE_QUERY, (err,results) =>{
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

app.get('/vaccine_pen', (req, res) =>{
	connection.query(SELECT_ALL_VACCINEPEN_QUERY, (err,results) =>{
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
	var name = '0';
	var price = 0;
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

app.get('/vaccine/add', (req, res) =>{
	var vac_id = 0;
	var vac_name = '5';
	var type_id = 0;
	const INSERT_VACCINE_QUERY = 'INSERT INTO vaccine (vac_id, vac_name, type_id) VALUES('+vac_id+', '+vac_name+', '+type_id+')';
	connection.query(INSERT_VACCINE_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('VACCINE ADDED')
		}
	});
});

app.get('/vaccine_pen/add', (req, res) =>{
	var vac_id = 7;
	var pen_id = 8;
	
	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine_pen (vac_id, pen_id) VALUES('+vac_id+', '+pen_id+')';
	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('VACCINEPEN ADDED')
		}
	});
});



app.listen(4000, () => {
	console.log('Products server listening on port 4000')


});

