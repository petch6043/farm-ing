import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Badge,Icon,Affix } from 'antd';

class Footer extends Component {
	render() {
		return(
			<Affix>
			<Row className="myNav">
				<Col span={6} align="center">
					<Badge count={0} className="myTab">
						<a href="/"><Icon type="home" style={{ fontSize: 20, color: '#000'}} /></a>
				    </Badge>
				</Col>
				<Col span={6} align="center">
					<Badge count={0} className="myTab">
				      	<a href="/calendar"><Icon type="calendar" style={{ fontSize: 20, color: '#000'}} /></a>
				    </Badge>
				</Col>
				<Col span={6} align="center">
					<Badge count={2} className="myTab">
				      	<a href="/notification"><Icon type="bell" style={{ fontSize: 20, color: '#000'}} /></a>
				    </Badge>
				</Col>
				<Col span={6} align="center">
					<Badge count={0} className="myTab">
				      	<a href="/account"><Icon type="user" style={{ fontSize: 20, color: '#000'}} /></a>
				    </Badge>
				</Col>
			</Row>
			</Affix>
		);
	}
}

export default Footer;