import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';

class Home extends Component {
	render() {
		return(
			<div>
				<Header thisPage="Home"/>
				<Row>
					<Col span={24} align="center" className="myUser">
						<Icon type="user" style={{ fontSize: 100 }} />
						<div>Firstname Lastname</div>
						<div>Position</div>
					</Col>
					<Col span={12} align="right">
						<a href="/food"><Button  icon="search" className="myButton">Food</Button></a>
					</Col>
					<Col span={12} align="left">
						<a href="/health"><Button  icon="search" className="myButton">Health</Button></a>
					</Col>
					<Col span={12} align="right">
						<a href="/transfer"><Button  icon="search" className="myButton">Transfer</Button></a>
					</Col>
					<Col span={12} align="left">
						<a href="/report"><Button  icon="search" className="myButton">Report</Button></a>
					</Col>
				</Row>
				<Footer/>
			</div>
		);
	}
}

export default Home;