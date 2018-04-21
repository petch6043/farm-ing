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
				<Link to="/">
					<Col span={6} align="center">
						<Badge count={0} className="myTab">
							<Icon type="home" style={{ fontSize: 30, color: '#000'}} />
					    </Badge>
					</Col>
				</Link>
				<Link to="/calendar">
					<Col span={6} align="center">
						<Badge count={0} className="myTab">
					      	<Icon type="calendar" style={{ fontSize: 30, color: '#000'}} />
					    </Badge>
					</Col>
				</Link>
				<Link to="/notification">
					<Col span={6} align="center">
						<Badge count={2} className="myTab">
					      	<Icon type="bell" style={{ fontSize: 30, color: '#000'}} />
					    </Badge>
					</Col>
				</Link>
				<Link to="/user">
					<Col span={6} align="center">
						<Badge count={0} className="myTab">
					      	<Icon type="user" style={{ fontSize: 30, color: '#000'}} />
					    </Badge>
					</Col>
				</Link>
			</Row>
			
		);
	}
}

export default Footer;