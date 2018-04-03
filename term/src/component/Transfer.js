import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './transfer/Add';
import Show from './transfer/Show';

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
			<div>
				<Header/>
				<div>Transfer</div>
				<Add onAdd={this.onAdd}/>
				<Show transferList={transferList}/>
				<Footer/>
			</div>
		);
	}
}

export default Transfer;