import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Show from './Transfer_report/Show';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import { DatePicker } from 'antd';
import { Select } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

const Option = Select.Option;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
	console.log(date, dateString);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

const noti = (type, msg, desc) => {
	notification[type]({
		message: msg,
		description: desc,
	});
};

const Panel = Collapse.Panel;
const customPanelStyle = {
	background: '#f7f7f7',
	borderRadius: 4,
	marginBottom: 5,
	border: 0,
	overflow: 'hidden',
};

class Transfer_report extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reportList: []
		}
	}

	componentDidMount(){
		this.getReport();
	}

	getReport = _ => {
	    fetch("http://206.189.35.130:4000/report/get/food")
		.then(response => response.json())
		.then(response => this.setState({ reportList: response.data}))
		.catch(err => console.error(err))
	}


	render() {
		let {reportList} = this.state;
		return(
			<div>
				<Header thisPage="รายงานอาหารและการเคลื่อนย้าย"/>
				<div className="myBody">
					<div className="mySelect" style={{marginTop: 10}}><DatePicker onChange={onChange} /></div> 
					<h2>รายชื่อรายงาน:</h2>
					<Link to={process.env.PUBLIC_URL + '/reports/19Apr2018-DailyFoodReport.csv'} target='_blank'>
						<div><Button icon="file-excel" style={{marginBottom:10}}>รายงานประจำวัน 19-01-61</Button></div>
					</Link>
					<Link to={process.env.PUBLIC_URL + '/reports/20Apr2018-DailyFoodReport.csv'} target='_blank'>
						<div><Button icon="file-excel" style={{marginBottom:10}}>รายงานประจำวัน 20-01-61</Button></div>
					</Link>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer_report;