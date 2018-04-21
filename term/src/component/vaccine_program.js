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
			vaccineprogramList: [],
			barnNo: props.location.barnNumber
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getVaccineProgram();
	}

	getVaccineProgram() {
		console.log(this.state.barnNo)
	    fetch("http://206.189.35.130:4000/vaccine_program/")
	    .then(response => response.json())
	    .then(response => this.setState({ vaccineprogramList: response.data}))
	    .catch(err => console.error(err))
	    
	}
	onAdd(selected) {
		var x = this;
		selected.map(function(item) {
			fetch('http://206.189.35.130:4000/vaccine_program/add', {
		    	method: 'POST',
		    	headers: {
		    		Accept: 'application/json',
		    		'Content-Type': 'application/json',
		    	},
		    	body: JSON.stringify({
		    		vac_id: selected.vac_id,
		    		pen_id: 2
		    		
		    	}),
		    })
		    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','Add vaccine','Sucessfully saved data.');
	    			x.getVaccineProgram();
	    		} else {
	    			noti('error','Add vaccine','Unable to save data.');
	    		}
           	});
	    })
	    .catch(err => {
	    	noti('error','Add transfer',err);
	    })
	    	.catch(err => console.error(err))
		});
		/*
		fetch('http://206.189.35.130:4000/vaccine_program/add', {
	    	method: 'POST',
	    	headers: {
	    		Accept: 'application/json',
	    		'Content-Type': 'application/json',
	    	},
	    	body: JSON.stringify({
	    		vac_id: 2,
	    		pen_id: 2
	    		
	    	}),
	    })
	    .then(this.getVaccineProgram)
	    .catch(err => console.error(err))
	    */
	}

	render() {
		let {vaccineprogramList} = this.state;
		let {barnNo} = this.state;
		console.log(this.state.vaccineprogramList)
		return(
			<div>
				<Header thisPage={"วัคซีนโปรแกรมของเล้าที่ : "+ barnNo}/>
				<div className="myBody">
					<div className="mySelect">
						<DatePicker onChange={onChange} />
					</div>
							

				

					<Show onAdd={this.onAdd} vaccineprogramList={vaccineprogramList}/>

					
				
				
				</div>

			

			
			
				<Footer/>
			</div>
			
		);
	}
}

export default vaccine_program;