import React, { Component } from 'react';
import { Affix, Menu, Icon, Button, Badge } from 'antd';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class Footer extends Component {
	render() {
		return(
			<Row className="myNav">
				<Col span={6} align="center">
					<Badge count={0} className="myTab">
						<Link to="/"><Icon type="home" style={{ fontSize: 20, color: '#000'}} /></Link>
				    </Badge>
				</Col>
				<Col span={6} align="center">
					<Badge count={0} className="myTab">
				      	<Link to="/calendar"><Icon type="calendar" style={{ fontSize: 20, color: '#000'}} /></Link>
				    </Badge>
				</Col>
				<Col span={6} align="center">
					<Badge count={2} className="myTab">
				      	<Link to="/notification"><Icon type="bell" style={{ fontSize: 20, color: '#000'}} /></Link>
				    </Badge>
				</Col>
				<Col span={6} align="center">
					<Badge count={0} className="myTab">
				      	<Link to="/account"><Icon type="user" style={{ fontSize: 20, color: '#000'}} /></Link>
				    </Badge>
				</Col>
			</Row>
			
		);
	}
}

export default Footer;