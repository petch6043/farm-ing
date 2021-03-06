import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col, Card, Menu, Icon, Button } from 'antd';
import PropTypes from 'prop-types'; 
import './myStyle.css';

class Header extends Component {
	static contextTypes = {
    	router: PropTypes.object
	}

	render() {
		let {thisPage} = this.props;
		return(
			<Row>
				<Col span={24} className="myTop myBigFont">
					<Icon onClick={this.context.router.history.goBack} type="left" style={{ fontSize: 25 }} className="myBack"/>
					<div className="myTopLabel">{thisPage}</div>
				</Col>
			</Row>

		);
		
	}
}

export default Header;

