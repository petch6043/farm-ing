import React, { Component } from 'react';
import Vaccine from './Vaccine';
import vaccine_pen from './vaccine_pen';
import vaccine_type from './vaccine_type';
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


    		<div className="myHome">
			<Row>
					<Col span={24} align="center" className="myUser">
						<Icon type="user" style={{ fontSize: 100 }} />
						<div>Health</div>
						
					</Col>	

				<Col span={12} align="right">
				<Link to="/vaccine"><Button icon="search" className="myButton">Vaccine</Button></Link>
				</Col>

				<Col span={12} align="left">
				<Link to="/vaccine_pen"><Button icon="search" className="myButton">Vaccine_pen</Button></Link>
				</Col>

				<Col span={12} align="right">
				<Link to="/vaccine_type"><Button icon="search" className="myButton">Vaccine_type</Button></Link>
				</Col>

			</Row>
			</div>
			<Footer/>

		</div>

    	
    );
  }
}

export default vaccine_menu;