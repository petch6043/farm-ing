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
			<Row>
				<Col span={24} className="myTop">
					<a href="/"><Icon type="left-circle" style={{ fontSize: 20 }} className="myBack" /></a>
					<div align="center">{thisPage}</div>
				</Col>
			</Row>

		);
	}
}

export default Header;