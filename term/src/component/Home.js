import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class Home extends Component {
	render() {
		return(
			<div>
				<div className="myHome">
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
				</div>
=======
				<Row>
					<Col span={24} align="center" className="myUser">
						<Icon type="user" style={{ fontSize: 100 }} />
						<div>Firstname Lastname</div>
						<div>Position</div>
					</Col>
					<Col span={12} align="right">
						<Link to="/food"><Button  icon="search" className="myButton">Food</Button></Link>
					</Col>
					<Col span={12} align="left">
						<Link to="/vaccine_menu"><Button  icon="search" className="myButton">Health</Button></Link>
					</Col>
					<Col span={12} align="right">
						<Link to="/transfer"><Button  icon="search" className="myButton">Transfer</Button></Link>
					</Col>
					<Col span={12} align="left">
						<Link to="/report"><Button  icon="search" className="myButton">Report</Button></Link>
					</Col>
				</Row>
>>>>>>> 902329a84839d9ddd6a79f1499ea6f4b9555269c
				<Footer/>
			</div>
		);
	}
}

export default Home;