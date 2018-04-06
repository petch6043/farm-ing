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
import { Menu, Icon, Button } from 'antd';
import './myStyle.css';

class Header extends Component {
	static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

	render() {
		let {thisPage} = this.props;
		return(
			<Row>
				<Col span={24} className="myTop">
					<Icon onClick={this.context.router.history.goBack} type="left" style={{ fontSize: 25 }} className="myBack"/>
					<div className="myTopLabel">{thisPage}</div>
				</Col>
			</Row>

		);
		
	}
}

export default Header;

