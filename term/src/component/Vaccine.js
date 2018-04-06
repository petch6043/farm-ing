import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine/Add';
import Show from './vaccine/Show';
import { DatePicker } from 'antd';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';

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
				<Header thisPage="Vaccine"/>
				
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
						<Panel header="Add vaccine" key="2" style={customPanelStyle}>
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>	
				
				<Show vaccineList={vaccineList}/>
				</div>
			
				<Footer/>
			</div>
		);
	}
}

export default Vaccine;