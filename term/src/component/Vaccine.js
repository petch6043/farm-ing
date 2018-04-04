import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine/Add';
import Show from './vaccine/Show';

class Vaccine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccineList: []
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getVaccines();
	}

	getVaccines = _ => {
	    fetch("http://localhost:4000/vaccine")
	      .then(response => response.json())
	      .then(response => this.setState({ vaccineList: response.data}))
	      .catch(err => console.error(err))
	}

	onAdd(vaccine) {
		console.log("A" + vaccine);
		    fetch('http://localhost:4000/vaccine/add', {
		    	method: 'POST',
		    	headers: {
		    		Accept: 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		
		    		vac_name: vaccine.vac_name,
		    		type_id: vaccine.type_id,
		    		
		    	}),
		    })
		    .then(this.getVaccines)
		    .catch(err => console.error(err))
		    console.log('addVaccines');
	}

	render() {
		let {vaccineList} = this.state;
		return(
			<div>
				<Header/>
				<div>Vaccine</div>
				<Add onAdd={this.onAdd}/>
				<Show vaccineList={vaccineList}/>
			
				<Footer/>
			</div>
		);
	}
}

export default Vaccine;