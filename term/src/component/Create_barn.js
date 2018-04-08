import React, { Component } from 'react';
import Show from './Create_barn/Show';
import {  Icon } from 'antd';
import { Row, Col } from 'antd';
import Header from './Header';
import Footer from './Footer';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import { DatePicker } from 'antd';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
	console.log(date, dateString);
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

class Create_barn extends Component {
	render() {

		let {Barn_no} = this.props.location
		console.log(Barn_no);
		return (
			<div>
				<Header thisPage= "Create Barn"/>
					
							
					<center><DatePicker onChange={onChange} /></center>
				<Row>	

				<Col span={14} align="right">	
				<Link to="/transfer_barn_select"><Button icon="search" className="myButton">Create Barn {Barn_no}</Button></Link>
				</Col>
					

				</Row>

			<Footer/>

			</div>
		);
	}
}

export default Create_barn;
 