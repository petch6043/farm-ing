const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const SELECT_ALL_PEN_QUERY = 'SELECT * FROM pen';
const SELECT_ALL_VACCINE_QUERY = 'SELECT * FROM vaccine';
const SELECT_ALL_VACCINEPEN_QUERY = 'SELECT * FROM vaccine_pen';
const SELECT_ALL_REPORT_QUERY = 'SELECT * FROM report';
const SELECT_ALL_VACCINETYPE_QUERY = 'SELECT * FROM vaccine_type';
const SELECT_ALL_BARN_QUERY = 'SELECT * FROM barn';
const SELECT_ALL_PENCOUNT_QUERY = 'SELECT * FROM transfer';
const SELECT_ALL_FOOD_QUERY = 'SELECT * FROM food';

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//connect to SQL server
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'react_sql',
	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
	password: 'nenaneno',
	database: 'react_sql'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());

app.get('/',(req,res) => {
	res.send('hello from the farm-ing server!')

});	

/*-------------------------- BARN --------------------------*/
app.get('/barn', (req, res) =>{
	connection.query(SELECT_ALL_BARN_QUERY, (err,results) =>{
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

app.get('/barn/add', (req, res) =>{
	var barn_id = '1';
	const INSERT_BARN_QUERY = 'INSERT INTO barn (barn_id) VALUES('+barn_id+')';
	connection.query(INSERT_BARN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('BARN ADDED')
		}
	});
});

/*-------------------------- PEN --------------------------*/
app.get('/pen', (req, res) =>{
	connection.query(SELECT_ALL_PEN_QUERY, (err,results) =>{
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

app.get('/pen/add', (req, res) =>{
	var pen_id = 2;
	var barn_id = 1;
	const INSERT_PEN_QUERY = 'INSERT INTO pen (pen_id, barn_id) VALUES('+pen_id+', '+barn_id+')';
	connection.query(INSERT_PEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('ADDED')
		}
	});
});

/*-------------------------- TRANSFER --------------------------*/
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

// app.get('/transfer/add/', (req, res) =>{
// 	var type = 'add';
// 	var pen_id = 1;
// 	var user_id = 1;
// 	var value = 3;
// 	const INSERT_PRODUCTS_QUERY = 'INSERT INTO transfer (type, pen_id, user_id, value) VALUES("'+type+'", '+pen_id+', '+user_id+', '+value+')';
// 	connection.query(INSERT_PRODUCTS_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.send('ADDED')
// 		}
// 	});
// });

app.post('/transfer/add', function(req, res) {
    var type = req.body.type;
	var pen_id = req.body.pen_id;
	var user_id = req.body.user_id;
	var value = req.body.value;
	console.log("body.type is "+req.body.type+' '+req.body.userID);
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

/*-------------------------- FOOD --------------------------*/
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

// app.get('/food/add', (req, res) =>{
// 	var pen_id = 1;
// 	var amount = 2;
// 	var food_type = 3;
// 	var user_id = 4;
// 	console.log(req.query);
// 	const INSERT_food_QUERY = 'INSERT INTO food (pen_id, amount,food_type ,user_id) VALUES('+pen_id+', '+amount+','+food_type+' ,'+user_id+')';
// 	connection.query(INSERT_food_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.send('food ADDED')
// 		}
// 	});
// });

app.post('/food/add', function(req, res) {
    var pen_id = req.body.pen_id;
	var amount = req.body.amount;
	var food_type = req.body.food_type;
	var user_id = req.body.user_id;
	const INSERT_FOOD_QUERY = 'INSERT INTO food (pen_id, amount, food_type, user_id) VALUES('+pen_id+', '+amount+', '+food_type+', '+user_id+')';
	connection.query(INSERT_FOOD_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('FOOD ADDED')
		}
	});
});

/*-------------------------- REPORT --------------------------*/
app.get('/report', (req, res) =>{
	connection.query(SELECT_ALL_REPORT_QUERY, (err,results) =>{
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

app.get('/report/generate/', (req, res) =>{
	var barn_id = 1;
	var pig_current = 50;
	var pig_sold = 20;
	var pig_sick = 5;
	var pig_die = 3;
	var food_amount = 100;
	var fpp = food_amount/pig_current;
	var report_type = 'monthly';
	console.log(fpp)
	const INSERT_PRODUCTS_QUERY = 'INSERT INTO report (barn_id, pig_current, pig_sold, pig_sick, pig_die, food_amount, fpp, report_type) VALUES("'+
	barn_id+'", '+pig_current+', '+pig_sold+', '+pig_sick+', '+pig_die+', '+food_amount+', '+fpp+', "'+report_type+'")';
	connection.query(INSERT_PRODUCTS_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('Generated')
		}
	});
});

/*-------------------------- VACCINE --------------------------*/
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

app.get('/vaccine_pen/add', (req, res) =>{
	var vac_id = 4;
	var pen_id = 1;
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

app.get('/vaccine_type', (req, res) =>{
	connection.query(SELECT_ALL_VACCINETYPE_QUERY, (err,results) =>{
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

app.get('/vaccine_type/add', (req, res) =>{
	var type_id = 7;
	var type_name = 'yolo';
	var age = 8;
	var isRequired = true;
	const INSERT_VACCINETYPE_QUERY = 'INSERT INTO vaccine_type (type_id, type_name,age,isRequired) VALUES('+type_id+', "'+type_name+'",'+age+', '+isRequired+')';
	connection.query(INSERT_VACCINETYPE_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('VACCINETYPE ADDED')
		}
	});
});

app.listen(4000, () => {
	console.log('Products server listening on port 4000')
});

