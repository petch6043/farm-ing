import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_urgent/Add';
import Show from './vaccine_urgent/Show';
import { DatePicker } from 'antd';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import Selectmenu from './Selectmenu';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function onChange(date, dateString) {
	console.log(date, dateString);
}

const noti = (type, msg, desc) => {
	notification[type]({
		message: msg,
		description: desc,
	});
};

const Panel = Collapse.Panel;
const customPanelStyle = {
	background: '#f7f7f7',
	borderRadius: 4,
	marginBottom: 5,
	border: 0,
	overflow: 'hidden',
};


class vaccine_urgent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccineurgentList: []
		}
		this.onAdd2 = this.onAdd2.bind(this);
		this.onAdd = this.onAdd.bind(this);

	}

	componentDidMount(){
		this.getVaccineUrgent();
	}

	getVaccineUrgent = _ => {
	    fetch("http://localhost:4000/vaccine_urgent")
	      .then(response => response.json())
	      .then(response => this.setState({ vaccineurgentList: response.data}))
	      .catch(err => console.error(err))
	}

	onAdd(vac_id) {
		console.log("A" + vac_id);
		    fetch('http://localhost:4000/vaccine_urgent/add', {
		    	method: 'POST',
		    	headers: {
		    		Accept: 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		
		    		vac_id: vac_id,
		    		pen_id: 2
		    		
		    	}),
		    })
		    .then(this.getVaccineUrgent)	
		    .catch(err => console.error(err))
		    console.log('addVaccine');
	}


	onAdd2(vaccineurgent) {
		console.log("B");
		    fetch('http://localhost:4000/vaccine_urgent/addurgent', {
		    	method: 'POST',
		    	headers: {
		    		Accept: 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		
		    		vac_name: vaccineurgent.vac_name,
		    		required: 0,
		    		
		    	}),
		    })
		    .then(this.getVaccineUrgent)	
		    .catch(err => console.error(err))
		    console.log('addVaccine');
	}

	render() {
		let {vaccineurgentList} = this.state;
		return(
			<div>
				<Header thisPage="Vaccine Urgent"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
						<Panel header="Select Barn" key="1" style={customPanelStyle}>
							<Selectmenu/>
						</Panel>

						<Panel header="submit" key="2" style={customPanelStyle}>
							<Add onAdd2={this.onAdd2}/>
						</Panel>

						
						
					</Collapse>	
				<Show onAdd={this.onAdd} vaccineurgentList={vaccineurgentList}/>	
					
					
					
				
				
				</div>
			
				<Footer/>
			</div>
			
		);
	}
}

export default vaccine_urgent;