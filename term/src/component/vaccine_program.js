import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_program/Add';
import Show from './vaccine_program/Show';
import { DatePicker } from 'antd';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import Selectmenu from './Selectmenu';
import { Row, Col , Select} from 'antd';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
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
			barnNo: props.location.barnNumber,
			vaccined: [],
			pen_id:0
		}
		this.onAdd = this.onAdd.bind(this);
		this.handleChange = this.handleChange.bind(this);
		//this.getVaccineProgram = this.getVaccineProgram.bind(this);
	}

	componentDidMount(){
		//this.getVaccineProgram();
		
	}
/*
	getVaccineProgram() {
	    fetch("http://farm-ing.co:4000/vaccine_program/")
	    .then(response => response.json())
	    .then(response => this.setState({ vaccineprogramList: response.data}))
	    .catch(err => console.error(err))
	    
	}
	*/
	getVaccinePen() {
		console.log("http://farm-ing.co:4000/vaccine_pen/"+this.state.barnNo+"/"+this.state.pen_id)
	    fetch("http://farm-ing.co:4000/vaccine_pen/"+this.state.barnNo+"/"+this.state.pen_id)
	    .then(response => response.json())
	    .then(response => this.setState({ vaccineprogramList: response.data}))
	    .catch(err => console.error(err))
	}
	
	onAdd() {
		//selected.map(function(item) {
			console.log('http://farm-ing.co:4000/vaccine_pen/'+this.state.barnNo+"/"+this.state.pen_id+'/add')
			fetch('http://farm-ing.co:4000/vaccine_pen/'+this.state.barnNo+"/"+this.state.pen_id+'/add')
		    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','Add vaccine','Sucessfully saved data.');
	    			this.getVaccinePen();
	    		} else {
	    			noti('error','Add vaccine','Unable to save data.');
	    		}
           	});
	    })
	    .catch(err => {
	    	noti('error','Add transfer',err);
	    })
	    	.catch(err => console.error(err))
		//});
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

	handleChange(value) {
 		console.log(`selected ${value}`);
 		this.setState({pen_id:value})
 		console.log("http://farm-ing.co:4000/vaccine_pen/"+this.state.barnNo+"/"+value);
 		fetch("http://farm-ing.co:4000/vaccine_pen/"+this.state.barnNo+"/"+value)
	    .then(response => response.json())
	    .then(response => this.setState({ vaccineprogramList: response.data}))
	    /*.then(response => {

	    	if(response.data.length > 0) {
	    		this.setState({ vaccined: [0]})
	    	} else {
	    		this.setState({ vaccined: []})
	    	}
	    	console.log(this.state.vaccined)
	    })
	    */
	    .catch(err => console.error(err))
	}

	render() {
		let {vaccineprogramList} = this.state;
		let {barnNo} = this.state;
		console.log(this.state.vaccineprogramList)	
		return(
			<div>
				<Header thisPage={"วัคซีนโปรแกรมของเล้าที่ : "+ barnNo}/>
				<div className="myBody">
					<div className="mySelect myBigFont">
						<DatePicker onChange={onChange} placeholder="เลือกวันที่"/>
					</div>
					<div className="mySelect myBigFont">
						<Select placeholder="เลือกคอก" style={{ width: 190 }} onChange={this.handleChange} className="myBigFont">
	    					<Option value='1'><div className="myBigFont">คอก 1</div></Option>
	    					<Option value='2'><div className="myBigFont">คอก 2</div></Option>
	    					<Option value='3'><div className="myBigFont">คอก 3</div></Option>
	    					<Option value='4'><div className="myBigFont">คอก 4</div></Option>
	    					<Option value='5'><div className="myBigFont">คอก 5</div></Option>
	    				</Select>
    				</div>
    				<Show onAdd={this.onAdd} vaccineprogramList={vaccineprogramList}/>
    			</div>
    			<Footer/>
    		</div>
			
		);
	}
}

export default vaccine_program;