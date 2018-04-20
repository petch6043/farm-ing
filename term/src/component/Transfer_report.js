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
	    fetch("http://localhost:4000/report")
		.then(response => response.json())
		.then(response => this.setState({ reportList: response.data}))
		.catch(err => console.error(err))
	}


	render() {
		let {reportList} = this.state;
		return(
			<div>
				<Header thisPage="Transfer & Food Report"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select option" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} /> 
						</Panel>
					</Collapse>

					<div>
						<h2>Transfer & Food Report: </h2>
						<Link to={process.env.PUBLIC_URL + '/reports/19Apr2018-DailyFoodReport.csv'} target='_blank'>
							<div><Button icon="file-excel" style={{marginBottom:10}}>28-12-60 (Daily report)</Button></div>
						</Link>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer_report;