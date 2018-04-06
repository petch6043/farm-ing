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
						<Link to="/food">
							<Button className="myButton">
								<Icon type="inbox" style={{fontSize: 72}}/>
								<div>Food</div>
							</Button>
						</Link>
					</Col>
					<Col span={12} align="left">
						<Link to="/vaccine_menu">
							<Button className="myButton">
								<Icon type="medicine-box" style={{fontSize: 72}}/>
								<div>{'\n'}Health</div>
							</Button>
						</Link>
					</Col>
					<Col span={12} align="right">
						<Link to="/transfer">
							<Button className="myButton">
								<Icon type="swap" style={{fontSize: 72}}/>
								<div>Transfer</div>
							</Button>
						</Link>
					</Col>
					<Col span={12} align="left">
						<Link to="/report">
							<Button className="myButton">
								<Icon type="file-text" style={{fontSize: 72}}/>
								<div>Report</div>
							</Button>
						</Link>
					</Col>
				</Row>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Home;