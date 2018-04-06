import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_type/Add';
import Show from './vaccine_type/Show';

class vaccine_type extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccinetypeList: []
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getVaccinestype();
	}

	getVaccinestype = _ => {
	    fetch("http://localhost:4000/vaccine_type")
	      .then(response => response.json())
	      .then(response => this.setState({ vaccinetypeList: response.data}))
	      .catch(err => console.error(err))
	}

	onAdd(vaccinetype) {
		console.log("A" + vaccinetype);
		    fetch('http://localhost:4000/vaccine_type/add', {
		    	method: 'POST',
		    	headers: {
		    		Accept: 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		
		    		type_name: vaccinetype.type_name,
		    		age: vaccinetype.age,
		    		isRequired:vaccinetype.isRequired
		    		
		    	}),
		    })
		    .then(this.getVaccinestype)
		    .catch(err => console.error(err))
		    console.log('addVaccinestype');
	}

	render() {
		let {vaccinetypeList} = this.state;
		return(
			<div>
				<Header/>
				<div>Vaccine type</div>
				<Add onAdd={this.onAdd}/>
				<Show vaccinetypeList={vaccinetypeList}/>
			
				<Footer/>
			</div>
		);
	}
}

export default vaccine_type;