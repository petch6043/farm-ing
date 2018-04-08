import React, { Component } from 'react';
import Transfer_report from './Transfer_report';
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
				<Header thisPage="Report"/>
				<Row>

				

				<Col span={12} align="right">
						<Link to="/Transfer_report">
							<Button className="myButton">
								<Icon type="line-chart" style={{fontSize: 72}}/>
								<div>Transfer & Food <div>Report</div></div>
							</Button>
						</Link>
					</Col>

				
				<Col span={12} align="right">
						<Link to="/Health_report">
							<Button className="myButton">
								<Icon type="bar-chart" style={{fontSize: 72}}/>
								<div>Health Report</div>
							</Button>
						</Link>
					</Col>

				

				</Row>
			<Footer/>

			</div>
		);
	}
}

export default Report;
 