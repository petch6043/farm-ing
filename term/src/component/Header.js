import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';
import 'antd/dist/antd.css';

class Header extends Component {
	render() {
		return(
			<div>
				<Link to="/">Home</Link>
				<Link to="/transfer">Transfer</Link>
				<Link to="/food">Food</Link>
				<Link to="/vaccine">Vaccine</Link>
				<Link to="/report">Report</Link>
			</div>
		);
	}
}

export default Header;