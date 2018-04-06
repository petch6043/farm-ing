import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_pen/Add';
import Show from './vaccine_pen/Show';

class vaccine_pen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccinepenList: []
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getVaccinespen();
	}

	getVaccinespen = _ => {
	    fetch("http://localhost:4000/vaccine_pen")
	      .then(response => response.json())
	      .then(response => this.setState({ vaccinepenList: response.data}))
	      .catch(err => console.error(err))
	}

	onAdd(vaccinepen) {
		console.log("A" + vaccinepen);
		    fetch('http://localhost:4000/vaccine_pen/add', {
		    	method: 'POST',
		    	headers: {
		    		Accept: 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		
		    		vac_id: vaccinepen.vac_id,
		    		pen_id: vaccinepen.pen_id,
		    		
		    	}),
		    })
		    .then(this.getVaccinespen)
		    .catch(err => console.error(err))
		    console.log('addVaccinespen');
	}

	render() {
		let {vaccinepenList} = this.state;
		return(
			<div>
				<Header/>
				<div>Vaccine Pen</div>
				<Add onAdd={this.onAdd}/>
				<Show vaccinepenList={vaccinepenList}/>
			
				<Footer/>
			</div>
		);
	}
}

export default vaccine_pen;