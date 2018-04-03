import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

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