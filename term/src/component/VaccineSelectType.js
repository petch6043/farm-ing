import React, { Component } from 'react';
import Vaccine from './Vaccine';
import Header from './Header';
import Footer from './Footer';
import { Button, Icon, Row, Col } from 'antd';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

class VaccineSelectType extends Component {
  render() {
    return (
    	<div>
    		<Header thisPage="สุขภาพ"/>
			<Row>
				
				<Col span={12} align="right">
						<Link to="/vaccine/select">
							<Button className="myButton">
								<Icon type="check-square-o" style={{fontSize: 72}}/>
								<div>โปรแกรมวัคซีน</div>
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

export default VaccineSelectType;