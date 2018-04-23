import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_pen/Add';
import Show from './vaccine_pen/Show';
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
				<Header thisPage="Vaccine Pen"/>
				
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
						<Panel header="Add vaccine pen" key="2" style={customPanelStyle}>
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>	
				
				<Show vaccinepenList={vaccinepenList}/>
				</div>
			
				<Footer/>
			</div>
		);
	}
}

export default vaccine_pen;