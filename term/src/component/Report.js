import React, { Component } from 'react';
import ReportTransfer from './ReportTransfer';
import Header from './Header';
import Footer from './Footer';
import { Button, Icon, Row, Col } from 'antd';

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
				</Col>
				</Row>	
				<Footer/>
			</div>
		);
	}
}

export default Report;
 