import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Show from './Transfer_report/Show';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import { DatePicker } from 'antd';
import { Select,Icon } from 'antd';
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
				<Header thisPage="Health Report"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select option" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} /> 
							<Select defaultValue="all" style={{ width: 120, marginLeft: 10}} onChange={handleChange}>
								<Option value="all">All</Option>
								<Option value="daily">Daily</Option>
								<Option value="weekly">Weekly</Option>
								<Option value="monthly">Monthly</Option>
							</Select>
						</Panel>
					</Collapse>

					<div>
						<h2>Health Report: </h2>
						<Link to={process.env.PUBLIC_URL + '/ReportHealthPDF.pdf'} target='_blank'><Button icon="file-pdf" style={{marginBottom:10}}>28-12-60 (Daily report)</Button></Link>
						<Button icon="file-pdf" style={{marginBottom:10}}>29-12-60 (Daily report)</Button>
						<Button icon="file-pdf" style={{marginBottom:10}}>30-12-60 (Daily report)</Button>
						<Button icon="file-pdf" style={{marginBottom:10}}>31-12-60 (Daily report)</Button>
						<Button icon="file-pdf" style={{marginBottom:10}}>31-12-60 (Monthly report)</Button>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer_report;