import React, { Component } from 'react';
import { Affix, Menu, Icon, Button, Badge } from 'antd';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Card } from 'antd';

class Footer extends Component {
	render() {
		return(
			
          
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
			
		);
	}
}

export default Footer;