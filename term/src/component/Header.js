import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Menu, Icon } from 'antd';
import './myStyle.css';

class Header extends Component {
	render() {
		let {thisPage} = this.props;
		return(
<<<<<<< HEAD
			<div>
				<Link to="/">Home</Link>
				<Link to="/transfer">Transfer</Link>
				<Link to="/food">Food</Link>
				<Link to="/vaccine_menu">Health</Link>
				<Link to="/report">Report</Link>


			</div>
=======
			<Row>
				<Col span={24} className="myTop">
					<a href="/"><Icon type="left-circle" style={{ fontSize: 20 }} className="myBack" /></a>
					<div align="center">{thisPage}</div>
				</Col>
			</Row>
>>>>>>> 445322ba820d81f7ba6f1c61183759092ab7aa10
		);
	}
}

export default Header;