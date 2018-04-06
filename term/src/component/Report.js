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
				<Link to="/Transfer_report"><Button icon="search" className="myButton2">Transfer & Food Report</Button></Link>
				</Col>

				<Col span={12} align="left">
				<Link to="/Health_report"><Button icon="search" className="myButton2">Healt Report</Button></Link>
				</Col>

				

				</Row>
			<Footer/>

			</div>
		);
	}
}

export default Report;
 