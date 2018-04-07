import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_program/Add';
import Show from './vaccine_program/Show';
import { DatePicker } from 'antd';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import Selectmenu from './Selectmenu';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';

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


class vaccine_program extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccineprogramList: []
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getVaccineProgram();
	}

	getVaccineProgram = _ => {
	    fetch("http://localhost:4000/vaccine_program")
	      .then(response => response.json())
	      .then(response => this.setState({ vaccineprogramList: response.data}))
	      .catch(err => console.error(err))
	}
	onAdd(vac_id) {
		console.log("A" + vac_id);
		    fetch('http://localhost:4000/vaccine_program/add', {
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
		    .then(this.getVaccineProgram)
		    .catch(err => console.error(err))
		    console.log('addVaccine');
	}

	render() {
		let {vaccineprogramList} = this.state;
		return(
			<div>
				<Header thisPage="Vaccine Program"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
						<Panel header="Select Barn" key="2" style={customPanelStyle}>
							<Selectmenu/>
						</Panel>	

						<Panel header="submit" key="3" style={customPanelStyle}>
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>	

				

					<Show onAdd={this.onAdd} vaccineprogramList={vaccineprogramList}/>

					
				
				
				</div>

			

			
			
				<Footer/>
			</div>
			
		);
	}
}

export default vaccine_program;