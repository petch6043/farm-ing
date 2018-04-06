import React, { Component } from 'react';
import daily from './daily';
import weekly from './weekly';
import monthly from './monthly';
import yearly from './yearly';
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
				<Header thisPage="Health"/>
				<Row>	
				<Col span={12} align="right">	
				<Link to="/daily"><Button icon="search" className="myButton">daily</Button></Link>
				</Col>

				<Col span={12} align="left">
				<Link to="/weekly"><Button icon="search" className="myButton">weekly</Button></Link>
				</Col>

				<Col span={12} align="right">
				<Link to="/monthly"><Button icon="search" className="myButton">monthly</Button></Link>
				</Col>

				<Col span={12} align="left">
				<Link to="/yearly"><Button icon="search" className="myButton">yearly</Button></Link>
				</Col>

				</Row>
			<Footer/>

			</div>
		);
	}
}

export default Report;
 