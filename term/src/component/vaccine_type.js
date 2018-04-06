import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_type/Add';
import Show from './vaccine_type/Show';
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
				<Header thisPage="Vaccine Type"/>
				
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
						<Panel header="Add vaccine type" key="2" style={customPanelStyle}>
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>	
				
				<Show vaccinetypeList={vaccinetypeList}/>
				</div>
			
				<Footer/>
			</div>
		);
	}
}

export default vaccine_type;