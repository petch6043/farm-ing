import React, { Component } from 'react';
import { Affix, Menu, Icon, Button } from 'antd';
class Footer extends Component {
	render() {
		return(
			<Affix>
			<div align="center">
			<Button type="primary" icon="calendar" size='large' ghost></Button>
			<Button type="primary" icon="notification" size='large' ghost></Button>
			<Button type="primary" icon="home" size='large' ghost></Button>
			<Button type="primary" icon="setting" size='large' ghost></Button>
			<Button type="primary" icon="user" size='large' ghost></Button>

          	</div>
          	</Affix>
		);
	}
}

export default Footer;