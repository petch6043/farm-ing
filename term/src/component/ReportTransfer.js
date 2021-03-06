import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import ShowTransfer from './Report/ShowTransfer';
import {DatePicker} from 'antd';


class ReportTransfer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reportList: [],
			dateIsSelected: false,
			dateSelected: ""
		}
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		this.getReport();
	}

	getReport() {
	    fetch("http://206.189.35.130:4000/report/get/food")
		.then(response => response.json())
		.then(response => this.setState({ reportList: response.data}))
		.catch(err => console.error(err))
	}

	onChange(date, dateString) {
       	this.setState({dateSelected:dateString})
		console.log("xxxx"+this.state.dateSelected)
		console.log(date, dateString)
		console.log("http://206.189.35.130:4000/report/get/food/" + dateString);
		fetch("http://206.189.35.130:4000/report/get/food/" + dateString)
	    .then(response => response.json())
	    .then(response => {
	    	if(dateString!=""){
	    		console.log("selected date")
	    		this.setState({dateIsSelected: true})
	    	}else{
	    		console.log("deselected date")
	    		this.setState({dateIsSelected: false})
	    	}
	    	this.setState({ reportList: response.data })
	    
	    })
	    .catch(err => console.error(err))
	}



	render() {
		let {reportList} = this.state;
		return(
			<div>
				<Header thisPage="รายงานอาหารและการเคลื่อนย้าย"/>
				<div className="myBody">
					<div className="mySelect">
						<DatePicker onChange={this.onChange} placeholder="เลือกวันที่" />
					</div> 
					<h2>รายชื่อรายงาน</h2>
					<ShowTransfer transferReport={reportList}/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default ReportTransfer;