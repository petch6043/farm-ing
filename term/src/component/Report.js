import React, { Component } from 'react';
import ReportTransfer from './ReportTransfer';
import Health_report from './Health_report';
import { Button, Icon } from 'antd';
import { Row, Col } from 'antd';
import Header from './Header';
import Footer from './Footer';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

class Report extends Component {
	render() {
		return (
			<div>
				<Header thisPage="รายงาน"/>
				<Row>	
				<Col span={12} align="right">	
					<Link to="/report/transfer">
						<Button className="myButton">
							<Icon type="line-chart" style={{fontSize: 72}}/>
							<div>รายงานอาหารและ</div>
							<div>การเคลื่อนย้าย</div>
						</Button>
					</Link>
				</Col>

				<Col span={12} align="left">	
					{/*<Link to="/Health_report">
						<Button className="myButton">
							<Icon type="bar-chart" style={{fontSize: 72}}/>
							<div>รายงานสุขภาพ</div>
						</Button>
					</Link>
				*/}
				</Col>
				</Row>	
				<Footer/>
			</div>
		);
	}
}

export default Report;
 