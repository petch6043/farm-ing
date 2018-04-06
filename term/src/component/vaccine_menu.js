import React, { Component } from 'react';
import Vaccine from './Vaccine';
import vaccine_pen from './vaccine_pen';
import vaccine_type from './vaccine_type';
import vaccine_program from './vaccine_program';
import vaccine_urgent from './vaccine_urgent';
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

class vaccine_menu extends Component {
  render() {
    return (
    	<div>
    		<Header thisPage="Health"/>
			<Row>
				<Col span={12} align="right">
				<Link to="/vaccine_program"><Button icon="search" className="myButton">Vaccine Program</Button></Link>
				</Col>

				<Col span={12} align="left">
				<Link to="/vaccine_urgent"><Button icon="search" className="myButton">Urgent Vaccine</Button></Link>
				</Col>
			</Row> 
			<Footer/>
		</div>	
    );
  }
}

export default vaccine_menu;