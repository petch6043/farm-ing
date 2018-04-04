import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './daily/Add';
import Show from './daily/Show';


class daily extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reportList: []
		}
	}

	componentDidMount(){
		this.getReport();
	}

	getReport = _ => {
	    fetch("http://localhost:4000/report")
	      .then(response => response.json())
	      .then(response => this.setState({ reportList: response.data}))
	      .catch(err => console.error(err))
	}


	render() {
		let {reportList} = this.state;
		return(
			<div>
				<Show reportList={reportList}/>
				
			</div>
		);
	}
}

export default daily;