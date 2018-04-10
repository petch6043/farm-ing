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
const SELECT_ALL_FOOD_QUERY = "SELECT *, DATE_FORMAT(timestamp,'%d/%m/%Y - %k:%i') AS time FROM food";
const SELECT_ALL_VACCINEPROGRAM_QUERY ='SELECT age, vac_name, vac_id FROM vaccine WHERE required=1';
const SELECT_ALL_VACCINEURGENT_QUERY ='SELECT vac_name ,vac_id FROM vaccine WHERE required=0';


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//connect to SQL server 
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'root',
	database: 'react_sql',
	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock" //for Mac
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

//add new barn and add 5 pens to it
app.post('/barn/open', function(req, res) {
	var name = req.body.name;
	var user_id = req.body.user_id;
	var open_date = 'CURDATE()';
	const INSERT_BARN_QUERY = 'INSERT INTO barn (name, open_date, user_id) VALUES("'+name+'",'+open_date+', '+user_id+')';
	const GET_CURRENT_ID = 'SELECT AUTO_INCREMENT as barn_id FROM information_schema.TABLES WHERE TABLE_SCHEMA = "react_sql" AND TABLE_NAME = "barn"';
	connection.query(INSERT_BARN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		} else {	
			res.send('BARN '+name+' OPENED')
			connection.query(GET_CURRENT_ID, (err,results) =>{
				if (err) {
					return res.send(err)
				} else {
					barn_id = results[0].barn_id - 1
					console.log(barn_id)
					const INSERT_PEN_QUERY = 'INSERT INTO pen (pen_id, barn_id) VALUES(1, '+barn_id+'),(2, '+barn_id+'),(3, '+barn_id+'),(4, '+barn_id+'),(5, '+barn_id+')'
					connection.query(INSERT_PEN_QUERY, (err,results) =>{
						if (err) {
							return res.send(err)
						} else {	
							return res.send('5 pens added to'+barn_id)
						}
					});
				}
			});
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

// app.get('/pen/add', (req, res) =>{
// 	var pen_id = 2;
// 	var barn_id = 1;
// 	const INSERT_PEN_QUERY = 'INSERT INTO pen (pen_id, barn_id) VALUES('+pen_id+', '+barn_id+')';
// 	connection.query(INSERT_PEN_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.send('ADDED')
// 		}
// 	});
// });

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
	var barn_id = req.body.barn_id;
	var user_id = req.body.user_id;
	var value = req.body.value;
	const INSERT_PRODUCTS_QUERY = 'INSERT INTO transfer (barn_id, type, value, user_id) VALUES('+barn_id+', "'+type+'", '+value+', '+user_id+')';
	connection.query(INSERT_PRODUCTS_QUERY, (err,results) =>{
		if (err) {
			return res.send(err);
		} else {
			return res.send('1')
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

//select food by barn id
app.get('/food/:barn_id', (req, res) =>{
	var barn_id = req.params.barn_id;
	const SELECT_FOOD_BY_BARN_QUERY = "SELECT *, DATE_FORMAT(timestamp,'%d/%m/%Y - %k:%i') AS time FROM food WHERE barn_id="+barn_id;
	connection.query(SELECT_FOOD_BY_BARN_QUERY, (err,results) =>{
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

//select food by barn id and date
app.get('/food/:barn_id/:date', (req, res) =>{
	var barn_id = req.params.barn_id;
	var date = req.params.date;
	const SELECT_FOOD_BY_BARN_DATE_QUERY = 'SELECT * FROM food WHERE barn_id='+barn_id+' AND DATE(timestamp) = "'+date+'"';
	connection.query(SELECT_FOOD_BY_BARN_DATE_QUERY, (err,results) =>{
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
    var barn_id = req.body.barn_id;
	var amount = req.body.amount;
	var food_type = req.body.food_type;
	var user_id = req.body.user_id;
	const INSERT_FOOD_QUERY = 'INSERT INTO food (barn_id, amount, food_type, user_id) VALUES('+barn_id+', '+amount+', '+food_type+', '+user_id+')';
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
	const INSERT_REPORT_QUERY = 'INSERT INTO report (barn_id, pig_current, pig_sold, pig_sick, pig_die, food_amount, fpp, report_type) VALUES("'+
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

app.post('/report/generate/', (req, res) =>{
	var barn_id = req.body.barn_id;
	var pig_current, pig_sold, pig_sick, pig_die, food_amount, fpp;
	var report_type = 'monthly';
	const SUM_SOLD_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="sold";'; //change pen to barn
	const SUM_SICK_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="sick";';
	const SUM_DIED_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="died";';
	const SUM_FOOD_QUERY = 'SELECT IFNULL(SUM(amount),0) AS sum FROM food WHERE barn_id='+barn_id+';';
	const SUM_ADDED_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="add";';
	connection.query(SUM_SOLD_QUERY, (err,results) =>{
		if (err) {
			console.log('pig sold err')
			return res.send("err sold: "+err)
		}
		else{
			pig_sold = results[0].sum
			connection.query(SUM_SICK_QUERY, (err,results) =>{
				if (err) {
					return res.send("err sick: "+err)
				}
				else{
					pig_sick = results[0].sum
					connection.query(SUM_DIED_QUERY, (err,results) =>{
						if (err) {
							return res.send("err died: "+err)
						}
						else{
							pig_die = results[0].sum
							connection.query(SUM_ADDED_QUERY, (err,results) =>{
								if (err) {
									return res.send("err added: "+err)
								}
								else{
									pig_current = results[0].sum - pig_die - pig_sick - pig_sold
									connection.query(SUM_FOOD_QUERY, (err,results) =>{
										if (err) {
											return res.send("err food: "+err)
										}
										else{
											food_amount = results[0].sum
											fpp = food_amount/pig_current;
											const INSERT_REPORT_QUERY = 'INSERT INTO report (barn_id, pig_current, pig_sold, pig_sick, pig_die, food_amount, fpp, report_type) VALUES('+
											barn_id+', '+pig_current+', '+pig_sold+', '+pig_sick+', '+pig_die+', '+food_amount+', '+fpp+', "'+report_type+'")';
											connection.query(INSERT_REPORT_QUERY, (err,results) =>{
												if (err) {
													return res.send("err insert: "+err)
												}
												else{
													return res.send('Added report: barn_id '+
											barn_id+',pig_current '+pig_current+',pig_sold '+pig_sold+',pig_sick '+pig_sick+',pig_die '+pig_die+'food_amount '+food_amount+',fpp '+fpp+',report_type '+report_type+')')
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

//new report (GET from transfer) all barn
app.get('/report2', (req, res) =>{
	var barn_id;
	var pig_current, pig_sold, pig_sick, pig_die, food_amount, fpp;
	var report_type = 'monthly';
	var report = []
	var reportList = []
	const BARN_ID_QUERY = 'SELECT DISTINCT barn_id FROM transfer'
	connection.query(BARN_ID_QUERY, (err,results)=>{
		if (err) {
			console.log('barn id err')
			return res.send("err barn id: "+err)
		}else{
			console.log('gotBarnIDs :')
			console.log(results)
			results.forEach(async function(barn,i){
				console.log('for barn '+barn.barn_id+' i = '+i)
				var barn_id = barn.barn_id
				const SUM_SOLD_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="sold";';
				connection.query(SUM_SOLD_QUERY, (err,results) =>{
					if (err) {
						console.log('pig sold err')
						return res.send("err sold: "+err)
					}
					else{
						pig_sold = results[0].sum
						console.log(barn_id+' pig_sold = '+pig_sold)
						reportList.push({barn_id:pig_sold,pig_current:pig_sold})
						const SUM_SICK_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="sick";';
						connection.query(SUM_SICK_QUERY, (err,results) =>{
							if (err) {
								return res.send("err sick: "+err)
							}
							else{
								pig_sick = results[0].sum
								console.log(barn_id+' pig_sick = '+pig_sick)
								reportList.push({barn_id:barn_id,pig_sick:pig_sick})
								const SUM_DIED_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="died";';
								connection.query(SUM_DIED_QUERY, (err,results) =>{
									if (err) {
										return res.send("err died: "+err)
									}
									else{
										pig_died = results[0].sum
										console.log(barn_id+' pig_died = '+pig_died)
										reportList.push({barn_id:barn_id,pig_died:pig_died})
										const SUM_ADDED_QUERY = 'SELECT IFNULL(SUM(value),0) AS sum FROM transfer WHERE barn_id='+barn_id+' AND type="add";';
										connection.query(SUM_ADDED_QUERY, (err,results) =>{
											if (err) {
												return res.send("err added: "+err)
											}
											else{
												pig_current = results[0].sum - pig_died - pig_sick - pig_sold
												console.log(barn_id+' pig_current = '+pig_current)
												reportList.push({barn_id:barn_id,pig_current:pig_current})
												const SUM_FOOD_QUERY = 'SELECT IFNULL(SUM(amount),0) AS sum FROM food WHERE barn_id='+barn_id+';';
												connection.query(SUM_FOOD_QUERY, (err,results) =>{
													if (err) {
														return res.send("err food: "+err)
													}
													else{
														food_amount = results[0].sum
														fpp = food_amount/pig_current;
														reportList.push({barn_id:barn_id,food_amount:pig_current,fpp:fpp})
														return res.json(reportList)
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			})
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

/*app.get('/vaccine/add', (req, res) =>{
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
*/

app.post('/vaccine/add', function(req, res) {
    
	var vac_name = req.body.vac_name;
	var type_id = req.body.type_id;
	var age = req.body.age;
	var required = req.body.required;
	
	const INSERT_VACCINE_QUERY = 'INSERT INTO vaccine ( vac_name, type_id, age, required) VALUES("'+vac_name+'", '+type_id+', '+age+', '+required+')';
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

/*app.get('/vaccine_pen/add', (req, res) =>{
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
}); */

app.post('/vaccine_pen/add', function(req, res) {
    
	var vac_id = req.body.vac_id;
	var pen_id = req.body.pen_id;
	
	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine_pen ( vac_id, pen_id) VALUES('+vac_id+', '+pen_id+')';
	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('VACCINEPEN ADDED')
		}
	});
});

/*app.get('/vaccine_type/add', (req, res) =>{
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
}); */

app.get('/vaccine_program', (req, res) =>{
	connection.query(SELECT_ALL_VACCINEPROGRAM_QUERY, (err,results) =>{
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

app.post('/vaccine_program/add', function(req, res) {
    
	var vac_id = req.body.vac_id;
	var pen_id = req.body.pen_id;
	
	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine_pen ( vac_id, pen_id) VALUES('+vac_id+', '+pen_id+')';
	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('VACCINE ADDED')
		}
	});
});

app.get('/vaccine_urgent', (req, res) =>{
	connection.query(SELECT_ALL_VACCINEURGENT_QUERY, (err,results) =>{
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

app.post('/vaccine_urgent/add', function(req, res) {
    
	var vac_id = req.body.vac_id;
	var pen_id = req.body.pen_id;
	
	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine_pen ( vac_id, pen_id) VALUES('+vac_id+', '+pen_id+')';
	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('VACCINE ADDED')
		}
	});
});

app.post('/vaccine_urgent/addurgent', function(req, res) {
    
	var vac_name = req.body.vac_name;
	
	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine ( vac_name, required) VALUES("'+vac_name+'",0)';
	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('VACCINE ADDED')
		}
	});
});

app.listen(4000, () => {
	console.log('Products server listening on port 4000')
});

