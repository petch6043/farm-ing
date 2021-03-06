const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const csv = require('fast-csv');
const moment = require('moment');
const iconv = require('iconv-lite');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const app = express();

const SELECT_ALL_PEN_QUERY = 'SELECT * FROM pen';
const SELECT_ALL_VACCINE_QUERY = 'SELECT * FROM vaccine';
const SELECT_ALL_VACCINEPEN_QUERY = 'SELECT * FROM vaccine_pen';
const SELECT_ALL_REPORT_QUERY = 'SELECT * FROM report';
const SELECT_ALL_FOOD_REPORT_QUERY = "SELECT * FROM report_list WHERE type = 'transfer' ORDER BY id DESC";
const SELECT_ALL_VACCINETYPE_QUERY = 'SELECT * FROM vaccine_type';
const SELECT_ALL_BARN_QUERY = 'SELECT * FROM barn ORDER BY ABS(name)';
const SELECT_ALL_PENCOUNT_QUERY = 'SELECT * FROM transfer';
const SELECT_ALL_FOOD_QUERY = "SELECT *, DATE_FORMAT(timestamp,'%d/%m/%Y %k:%i') AS time FROM food";
const SELECT_ALL_VACCINEPROGRAM_QUERY ='SELECT age, vac_name, vac_id FROM vaccine WHERE required=1';
const SELECT_ALL_VACCINEURGENT_QUERY ='SELECT vac_name ,vac_id FROM vaccine WHERE required=0';
const SELECT_PROGRAM_DATE_QUERY = "SELECT DISTINCT name,DATE_FORMAT(program_date,'%d/%m/%Y') AS program_date_formatted,DATEDIFF(program_date,NOW()) as due FROM vaccine_pen NATURAL JOIN barn WHERE barn.active=1 AND done=0 ORDER BY due";

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//connect to SQL server 
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'chikadow2018', //for server, root for local
	database: 'react_sql',
	timezone: '+07:00',
	//socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock" //for Mac
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.use(cors());

app.get('/',(req,res) => {
	res.send('Hello from the farm-ing server!')

});	

/*-------------------------- BARN --------------------------*/
app.get('/task', (req, res) =>{
	connection.query(SELECT_PROGRAM_DATE_QUERY, (err,results) =>{
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
	var active = req.body.active;
	var open_date = req.body.open_date;
	var open_age = req.body.open_age;
		if (open_date==""){
			open_date=moment().format('YYYY-MM-DD')
		}
	const INSERT_BARN_QUERY = 'INSERT INTO barn (name, open_date, open_age, user_id, active) VALUES("'+name+'","'+open_date+'", '+open_age+', '+user_id+', '+active+')';
	//const GET_CURRENT_ID = 'SELECT AUTO_INCREMENT as barn_id FROM information_schema.TABLES WHERE TABLE_SCHEMA = "react_sql" AND TABLE_NAME = "barn"';
	connection.query(INSERT_BARN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		} else {
			return res.send("1");
		}
	});
});

//close barn by barn name
app.get('/barn/close/:barn_name', (req, res) =>{
	var barn_name = req.params.barn_name;
	var barn_id;
	const GET_BARN_ID_QUERY = 'SELECT barn_id FROM barn WHERE name='+barn_name+' AND active=1'
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			barn_id = results[0].barn_id
			const SELECT_TRANSFER_BY_BARN_QUERY = 'UPDATE barn SET active=0, close_date=CURRENT_DATE WHERE barn_id='+barn_id;
			connection.query(SELECT_TRANSFER_BY_BARN_QUERY, (err,results) =>{
				if (err) {
					return res.send(err)
				}
				else{
					return res.send('1')
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

app.get('/transfer/delete/:tran_id', function(req, res) {
	var tran_id = req.params.tran_id;
	const DELETE_TRANSFER_QUERY = 'DELETE FROM `transfer` WHERE tran_id='+tran_id;
	connection.query(DELETE_TRANSFER_QUERY, (err,results) =>{
		if (err) {
					return res.send(err);
				} else {
					return res.send("1")
		}
	});
});

//select transfer by barn name
app.get('/transfer/:barn_name', (req, res) =>{
	var barn_name = req.params.barn_name;
	var barn_id;
	const GET_BARN_ID_QUERY = 'SELECT barn_id FROM barn WHERE name='+barn_name+' AND active=1'
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			barn_id = results[0].barn_id
			const SELECT_TRANSFER_BY_BARN_QUERY = "SELECT *,DATE_FORMAT(date,'%d/%m/%Y') AS time, DATE_FORMAT(timestamp,'%d/%m/%Y - %k:%i') AS timestamp_formatted FROM transfer WHERE barn_id="+barn_id+" ORDER BY DATE(date) DESC";
			connection.query(SELECT_TRANSFER_BY_BARN_QUERY, (err,results) =>{
				if (err) {
					return res.send(err)
				}
				else{
					return res.json({
						data: results
					})
				}
			});
		}
	});
});

app.get('/transfer/current_pig/:barn_name', (req, res) =>{
	var barn_name = req.params.barn_name;
	const GET_BARN_ID_QUERY = 'SELECT get_current_pig('+barn_name+') as current_pig'
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
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

//select transfer by barn name and date
app.get('/transfer/:barn_name/:selected_date', (req, res) =>{
	var barn_name = req.params.barn_name;
	var selected_date = req.params.selected_date;
	var barn_id;
	const GET_BARN_ID_QUERY = 'SELECT barn_id FROM barn WHERE name = ' + barn_name + ' AND active = 1';
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			barn_id = results[0].barn_id
			const SELECT_TRANSFER_BY_BARN_QUERY = "SELECT *,DATE_FORMAT(timestamp,'%d/%m/%Y - %k:%i') AS timestamp_formatted FROM transfer WHERE barn_id = " + barn_id + " AND DATE(date) = '" + selected_date +"'";
			connection.query(SELECT_TRANSFER_BY_BARN_QUERY, (err,results) =>{
				if (err) {
					return res.send(err)
				}
				else{
					return res.json({
						data: results
					})
				}
			});
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
	var user_id = req.body.user_id;
	var value = req.body.value;
	var barn_name = req.body.barn_name;
	var from_barn_name = req.body.from_barn_name;
	var barn_id;
	var from_barn_id = from_barn_name;
	var selected_date = req.body.selected_date;
	const GET_BARN_ID_QUERY = 'SELECT barn_id FROM barn WHERE name = '+barn_name+' AND active = 1'
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			barn_id = results[0].barn_id
			console.log(barn_id)
			if (selected_date==""){
				selected_date=moment().format('YYYY-MM-DD')
			}


			const INSERT_PRODUCTS_QUERY = 'INSERT INTO transfer (barn_id, type, value, from_barn_id, user_id, date) VALUES('+barn_id+', "'+type+'", '+value+', '+from_barn_id+', '+user_id+',"'+ selected_date+'")';
			connection.query(INSERT_PRODUCTS_QUERY, (err,results) =>{
				if (err) {
					return res.send(err);
				} else {
					return res.send("1")
				}
			});
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

/*
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
*/
app.get('/food/delete/:food_id', function(req, res) {
	var food_id = req.params.food_id;
	const QUERY = 'DELETE FROM `food` WHERE food_id='+food_id;
	connection.query(QUERY, (err,results) =>{
		if (err) {
					return res.send(err);
				} else {
					return res.send("1")
		}
	});
});

//select food by barn name
app.get('/food/:barn_name', (req, res) =>{
	var barn_name = req.params.barn_name;
	var barn_id;
	const GET_BARN_ID_QUERY = 'SELECT barn_id FROM barn WHERE name='+barn_name+' AND active=1'
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			barn_id = results[0].barn_id
			const SELECT_FOOD_BY_BARN_QUERY = "SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS time,DATE_FORMAT(timestamp,'%d/%m/%Y - %k:%i') AS timestamp_formatted FROM food WHERE barn_id="+barn_id;
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
		}
	});
});

//select food by barn id and date
app.get('/food/:barn_name/:selected_date', (req, res) =>{
	var barn_name = req.params.barn_name;
	var selected_date = req.params.selected_date;
	var barn_id;
	const GET_BARN_ID_QUERY = 'SELECT barn_id FROM barn WHERE name='+barn_name+' AND active=1'
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			barn_id = results[0].barn_id
			const SELECT_FOOD_BY_BARN_QUERY = "SELECT *, DATE_FORMAT(timestamp,'%d/%m/%Y - %k:%i') AS timestamp_formatted FROM food WHERE barn_id=" + barn_id + " AND DATE(date) = '" + selected_date+"'";
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
		}x
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

/*
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
			return res.send(1)
		}
	});
});
*/

app.post('/food/add', function(req, res) {
	var barn_name = req.body.barn_name;
	var amount = req.body.amount;
	var food_type = req.body.food_type;
	var user_id = req.body.user_id;
	var barn_id;
	var selected_date = req.body.selected_date;
	const GET_BARN_ID_QUERY = 'SELECT barn_id FROM barn WHERE name='+barn_name+' AND active=1'
	connection.query(GET_BARN_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			barn_id = results[0].barn_id
			console.log(barn_id)
			if (selected_date==""){
				selected_date=moment().format('YYYY-MM-DD')
			}
			console.log(selected_date)
			const INSERT_FOOD_QUERY = 'INSERT INTO food (barn_id, amount, food_type, user_id, date) VALUES('+barn_id+', '+amount+', "'+food_type+'", '+user_id+',"'+selected_date+'")';
			connection.query(INSERT_FOOD_QUERY, (err,results) =>{
				if (err) {
					return res.send(err)
				}
				else{
					return res.send("1")
				}
			});
		}
	});
});

/*-------------------------- REPORT --------------------------*/
app.get('/report/get/food', (req, res) =>{
	var selected_date = req.params.selected_date;
	connection.query(SELECT_ALL_FOOD_REPORT_QUERY, (err,results) =>{
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

app.get('/report/get/food/:selected_date', (req, res) =>{
	var selected_date = req.params.selected_date;
	const SELECT_REPORT_BY_DATE_QUERY = "SELECT * FROM report_list WHERE report_date = '" + selected_date+"' ORDER BY id DESC"; 
	connection.query(SELECT_REPORT_BY_DATE_QUERY, (err,results) =>{
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

app.get('/report/food', (req, res) =>{
	const SELECT_ALL_REPORT2_QUERY = 'CALL generate_report()'
	connection.query(SELECT_ALL_REPORT2_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		} else {
			var type = "FoodAndTransfer";
			var dir = "./term/build/reports/";
			var dir2 = "/reports/";
			var dir3 = "./term/public/reports/";
			var name = moment().format("DDMMMYYYY") + "-Daily" + type + "Report" + ".csv";
			var ws = fs.createWriteStream(dir + name, { encoding: 'utf-8'} );
			var report = [];
			if(results[0].legnth == 0) {
				report = ["Nothing to report"];
			} else {
				report.push([ type + " report " + moment().format("DD MMM YYYY")]);
				report.push(["Barn id", "Barn name", "Date of open barn","Date of close barn","Age(Day)", "Current pig", "Cumulative Food(Kg)", "FPP", "Target FPP", "Move in", "Move out", "Sold", "Die", "Sick", "Defect", "Dwarf"]);
				results[0].forEach(function(item) {
					if(item.close_date == "ACTIVE") {
						item.close_date = "ACTIVE";
					} else {
						item.close_date = moment(item.close_date).format("DD MMM YYYY");
					}
					report.push([item.barn_id, item.barn_name, moment(item.open_date).format("DD MMM YYYY"), item.close_date, item.age, item.current_pig, item.cumulative_food, item.fpp, item.target_fpp, item.move_in, item.move_out, item.sold, item.die, item.sick, item.defect, item.dwarf]);
				});
			}
			
			csv.write(report, { headers: true })
			.pipe(ws)
			.on("finish", function(){
				//copy file
				fs.createReadStream(dir + name).pipe(fs.createWriteStream(dir3 + name));

				var n = 'รายงานประจำวัน ' + moment().format("YYYY-MM-DD");
				var p = dir2 + name;
				var d = moment().format("YYYY-MM-DD")
				var t = "transfer";
				const INSERT_REPORT_QUERY = "INSERT INTO report_list (report_name, report_path, report_date, type) VALUES('" + n + "','" + p + "','" + d + "','" + t + "')";
 				//const INSERT_REPORT_QUERY = "INSERT INTO report_list (report_name, report_path, report_date, type) VALUES('รายงานประจำวัน 20-01-61','/reports/20Apr2018-DailyFoodReport.csv','2018-04-20 00:00:00','transfer')";
 				connection.query(INSERT_REPORT_QUERY, (err,results) =>{
 					if (err) {
						return res.send(err);
					} else {
						
						var transporter = nodemailer.createTransport({
							service: 'gmail',
							auth: {
						    	user: 'farm.ingbkk@gmail.com',
						    	pass: 'farming2018'
							}
						});

						//var filename = "19Apr2018-DailyFoodReport.csv";
						var filename = name;
						//var path = "./term/public/reports/19Apr2018-DailyFoodReport.csv";
						var path = dir + name;
						const mailOptions = {
							from: 'noreply@farm-ing.co', // sender address
							to: 'suppakit.neno@gmail.com, goodkavin@gmail.com, nattapol.puttasuntithum@gmail.com, pasithtommy@gmail.com', // list of receivers
							subject: 'Farm-ing Daily report', // Subject line
							html: '<p>Please view a ' + moment().format("Do MMM YYYY") + ' report.</p><br><p>This report is auto-generated at ' + moment().format("Do MMMM YYYY, kk:mm:ss") + '</p>', // plain text body
							attachments: [
							    {
							        filename: filename,
							        path: path,
							        content: 'csv'
							    },
							]
						};

						transporter.sendMail(mailOptions, function (err, info) {
							if(err) return res.send(err)
							else return res.send(info)
						});
						
					}
 				});

		   	});
		}
	});
});

/*
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
*/

/*
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
*/

/*-------------------------- VACCINE --------------------------*/
// app.get('/vaccine', (req, res) =>{
// 	connection.query(SELECT_ALL_VACCINE_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.json({
// 				data: results
// 			})
// 		}
// 	});
// });

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

// app.post('/vaccine/add', function(req, res) {
    
// 	var vac_name = req.body.vac_name;
// 	var type_id = req.body.type_id;
// 	var age = req.body.age;
// 	var required = req.body.required;
	
// 	const INSERT_VACCINE_QUERY = 'INSERT INTO vaccine ( vac_name, type_id, age, required) VALUES("'+vac_name+'", '+type_id+', '+age+', '+required+')';
// 	connection.query(INSERT_VACCINE_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.send("1")
// 		}
// 	});
// });

// app.get('/vaccine_pen', (req, res) =>{
// 	connection.query(SELECT_ALL_VACCINEPEN_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.json({
// 				data: results
// 			})
// 		}
// 	});
// });

app.get('/vaccine_pen/:barn_name', (req, res) =>{
	var barn_name = req.params.barn_name;
	const SELECT_VACCINEBARN_QUERY = "SELECT *,DATE_FORMAT(program_date,'%d/%m/%Y') AS program_date_formatted FROM vaccine_pen NATURAL JOIN barn WHERE barn.active=1 AND name="+barn_name+'';
		connection.query(SELECT_VACCINEBARN_QUERY, (err,results) =>{
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

app.get('/vaccine_pen2/:barn_name', (req, res) =>{
	var barn_name = req.params.barn_name;
	const SELECT_VACCINEBARN_QUERY = "SELECT DISTINCT open_age, DATE_FORMAT(open_date,'%d/%m/%Y') AS open_date_formatted, DATE_FORMAT(program_date,'%d/%m/%Y') AS program_date_formatted FROM vaccine_pen NATURAL JOIN barn WHERE barn.active=1 AND name="+barn_name+'';
		connection.query(SELECT_VACCINEBARN_QUERY, (err,results) =>{
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



//get vaccine_pen by barn name and pen
app.get('/vaccine_pen/:barn_name/:pen_id', (req, res) =>{
	var barn_name = req.params.barn_name;
	var pen_id = req.params.pen_id;
	const SELECT_VACCINEPEN_QUERY = "SELECT *,DATE_FORMAT(program_date,'%d/%m/%Y') AS program_date_formatted FROM vaccine_pen NATURAL JOIN barn WHERE barn.active=1 AND name="+barn_name+' AND pen_id='+pen_id;
	connection.query(SELECT_VACCINEPEN_QUERY, (err,results) =>{
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

//add vaccine_pen by barn name and pen
app.get('/vaccine_pen/:barn_name/:pen_id/add', (req, res) =>{
	var barn_name = req.params.barn_name;
	var pen_id = req.params.pen_id;
	const SELECT_VACCINEPEN_QUERY = 'UPDATE vaccine_pen NATURAL JOIN barn SET done=1 WHERE barn.active=1 AND name='+barn_name+' AND pen_id='+pen_id;
	connection.query(SELECT_VACCINEPEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send('1')
		}
	});
});

// app.get('/vaccine_pen/:barn_name/add', (req, res) =>{
// 	var barn_name = req.params.barn_name;
// 	const SELECT_VACCINEPENADD_QUERY = 'UPDATE vaccine_pen NATURAL JOIN barn SET done=1 WHERE barn.active=1 AND name='+barn_name+'';
// 	connection.query(SELECT_VACCINEPENADD_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.send('1')
// 		}
// 	});
// });

// app.post('/vaccine_pen/add', function(req, res) {
    
// 	var vac_id = req.body.vac_id;
// 	var pen_id = req.body.pen_id;
	
// 	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine_pen ( vac_id, pen_id) VALUES('+vac_id+', '+pen_id+')';
// 	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{
// 		if (err) {
// 			return res.send(err)
// 		}
// 		else{
// 			return res.send("1")
// 		}
// 	});
// });

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

/*app.get('/vaccine_program', (req, res) =>{
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
*/
/*app.post('/vaccine_program/add', function(req, res) {
    
	var vac_id = req.body.vac_id;
	var pen_id = req.body.pen_id;
	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine_pen ( vac_id, pen_id) VALUES('+vac_id+', '+pen_id+')';
	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.send("1")
		}
	});
}); */

/*app.get('/vaccine_urgent', (req, res) =>{
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
			return res.send("1")
		}
	});
});

app.post('/vaccine_urgent/addurgent', function(req, res) {
    
	var vac_name = req.body.vac_name;
	
	const INSERT_VACCINEPEN_QUERY = 'INSERT INTO vaccine ( vac_name, required) VALUES("'+vac_name+'",0)';
	connection.query(INSERT_VACCINEPEN_QUERY, (err,results) =>{

		if (err) {
			return res.send(err)
		} else {
			return res.send("1")
		}
	});
});
*/
/*
app.get('/report/test', function(req, res) {
	phantom.create().then(function(ph) {
	    ph.createPage().then(function(page) {
	        page.open("http://localhost:4000/test").then(function(status) {
	            page.render('test.pdf').then(function() {
	               	res.send("DONE");
	                ph.exit();
	            });
	        });
	    });
	});
});
*/
// Report time trigger
/*
var job = new CronJob('00 00 12 * * 1-7',
	function() {
		// Runs every day at 12:00:00
  		console.log("Generating report");
	}, function () {
  		console.log("Report is generated");
  	},
  	true,
  	"Asia/Bangkok"
);
*/

// Report time trigger
var job = new CronJob('00 00 20 * * 1-7',
	function() {
		// Runs every day at 20:00:00
		const SELECT_ALL_REPORT2_QUERY = 'CALL generate_report()'
		connection.query(SELECT_ALL_REPORT2_QUERY, (err,results) =>{
			if (err) {
				return res.send(err)
			} else {
				var type = "FoodAndTransfer";
				var dir = "./term/build/reports/";
				var dir2 = "/reports/";
				var dir = "./term/public/reports/";
				var name = moment().format("DDMMMYYYY") + "-Daily" + type + "Report" + ".csv";
				var ws = fs.createWriteStream(dir + name, { encoding: 'utf-8'} );
				var report = [];
				if(results[0].legnth == 0) {
					report = ["Nothing to report"];
				} else {
					report.push([ type + " report " + moment().format("DD MMM YYYY")]);
					report.push(["Barn id", "Barn name", "Date of open barn","Date of close barn","Age(Day)", "Current pig", "Cumulative Food(Kg)", "FPP", "Target FPP", "Move in", "Move out", "Sold", "Die", "Sick", "Defect", "Dwarf"]);
					results[0].forEach(function(item) {
						if(item.close_date == "ACTIVE") {
							item.close_date = "ACTIVE";
						} else {
							item.close_date = moment(item.close_date).format("DD MMM YYYY");
						}
						report.push([item.barn_id, item.barn_name, moment(item.open_date).format("DD MMM YYYY"), item.close_date, item.age, item.current_pig, item.cumulative_food, item.fpp, item.target_fpp, item.move_in, item.move_out, item.sold, item.die, item.sick, item.defect, item.dwarf]);
					});
				}
				
				csv.write(report, { headers: true })
				.pipe(ws)
				.on("finish", function(){
					//copy file
					fs.createReadStream(dir + name).pipe(fs.createWriteStream(dir3 + name));

					var n = 'รายงานประจำวัน ' + moment().format("YYYY-MM-DD");
					var p = dir2 + name;
					var d = moment().format("YYYY-MM-DD")
					var t = "transfer";
					const INSERT_REPORT_QUERY = "INSERT INTO report_list (report_name, report_path, report_date, type) VALUES('" + n + "','" + p + "','" + d + "','" + t + "')";
	 				//const INSERT_REPORT_QUERY = "INSERT INTO report_list (report_name, report_path, report_date, type) VALUES('รายงานประจำวัน 20-01-61','/reports/20Apr2018-DailyFoodReport.csv','2018-04-20 00:00:00','transfer')";
	 				connection.query(INSERT_REPORT_QUERY, (err,results) =>{
	 					if (err) {
							return res.send(err);
						} else {
							
							var transporter = nodemailer.createTransport({
								service: 'gmail',
								auth: {
							    	user: 'farm.ingbkk@gmail.com',
							    	pass: 'farming2018'
								}
							});

							//var filename = "19Apr2018-DailyFoodReport.csv";
							var filename = name;
							//var path = "./term/public/reports/19Apr2018-DailyFoodReport.csv";
							var path = dir + name;
							const mailOptions = {
								from: 'noreply@farm-ing.co', // sender address
								to: 'suppakit.neno@gmail.com, goodkavin@gmail.com, nattapol.puttasuntithum@gmail.com, pasithtommy@gmail.com, pramote.ku.eng@gmail.com', // list of receivers
								subject: 'Farm-ing Daily report', // Subject line
								html: '<p>Please view a ' + moment().format("Do MMM YYYY") + ' report.</p><br><p>This report is auto-generated at ' + moment().format("Do MMMM YYYY, kk:mm:ss") + '</p>', // plain text body
								attachments: [
								    {
								        filename: filename,
								        path: path,
								        content: 'csv'
								    },
								]
							};

							transporter.sendMail(mailOptions, function (err, info) {
								if(err) return res.send(err)
								else return res.send(info)
							});
							
						}
	 				});

			   	});
			}
		});
	}, function () {
  		console.log("Report is generated and sent");
  	},
  	true,
  	"Asia/Bangkok"
);


app.listen(4000, () => {
	console.log('Server listening on port 4000')
});
