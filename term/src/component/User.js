import React, { Component } from 'react';
import { Button, Icon, Calendar, Collapse } from 'antd';
import { Row, Col } from 'antd';
import Header from './Header';
import Footer from './Footer';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

const Panel = Collapse.Panel;

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class User extends Component {
  render() {
    return (
    	<div>
    		<Header thisPage="Account"/>
    			<div  className="myCalendar" style={{padding:10}}>
				<Row>
					<Col span={24} align="center" >
						<img  style={{width: 80, height: 80,borderRadius:100}} src='https://st.depositphotos.com/2075685/3076/v/950/depositphotos_30768193-stock-illustration-business-pig.jpg'/>
						<div style={{fontSize: 20}}><b>Bacon Frankfurter</b></div>
						<div>CEO of Chikadow Farm</div>
						<Button type="danger" style={{bottom:-300}}>Log out</Button>
					</Col>
				</Row>
				</div>
			<Footer/>
		</div>	
	  
    );
  }
}

export default User;

