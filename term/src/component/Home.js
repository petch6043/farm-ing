import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Button from 'antd/lib/button';
import { DatePicker } from 'antd';

class Home extends Component {
	render() {
		return(
			<div>
				<Header/>
				<div>Home</div>
				<Footer/>
			</div>
		);
	}
}

export default Home;