import React, { Component } from 'react';
import daily from './daily';
import weekly from './weekly';
import monthly from './monthly';
import yearly from './yearly';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

<<<<<<< HEAD
class Transfer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transferList: []
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getTransfers();
	}

	getTransfers = _ => {
	    fetch("http://localhost:4000/transfer")
	      .then(response => response.json())
	      .then(response => this.setState({ transferList: response.data}))
	      .catch(err => console.error(err))
	}

	onAdd(transfer) {
		console.log("A" + transfer);
		    fetch('http://localhost:4000/transfer/add', {
		    	method: 'POST',
		    	headers: {
		    		Accept: 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		type: transfer.type,
		    		pen_id: transfer.pen_id,
		    		user_id: transfer.value,
		    		value: transfer.user_id
		    	}),
		    })
		    .then(this.getTransfers)
		    .catch(err => console.error(err))
		    console.log('addTransfer');
	}

	render() {
		let {transferList} = this.state;
		return(
			<div className="myBody">
				<Header/>
				<div>Transfer</div>
				<Add onAdd={this.onAdd}/>
				<Show transferList={transferList}/>
				<Footer/>
=======
class Report extends Component {
  render() {
    return (
    	
    		<div>
				<Link to="/daily">daily</Link>
				<Link to="/weekly">weekly</Link>
				<Link to="/monthly">monthly</Link>
				<Link to="/yearly">yearly</Link>
>>>>>>> 902329a84839d9ddd6a79f1499ea6f4b9555269c
			</div>
	
    );
  }
}

export default Report;
 