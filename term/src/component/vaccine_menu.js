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
    		<Header thisPage="สุขภาพ"/>
			<Row>
				
				<Col span={12} align="right">
						<Link to="/selectbarnvaccine">
							<Button className="myButton">
								<Icon type="check-square-o" style={{fontSize: 72}}/>
								<div>โปรแกรมวัคซีน</div>
							</Button>
						</Link>
				</Col>
				<Col span={12} align="left">
						<Link to="/selectbarnvaccine2">
							<Button className="myButton">
								<Icon type="exclamation-circle-o" style={{fontSize: 72}}/>
								<div>วัคซีนฉุกเฉิน</div>
							</Button>
						</Link>
				</Col>
			</Row> 
			<Footer/>
		</div>	
    );
  }
}

export default vaccine_menu;