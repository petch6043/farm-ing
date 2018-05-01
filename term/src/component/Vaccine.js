import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './Vaccine/Add';
import Show from './Vaccine/Show';
import Show2 from './Vaccine/Show2';
import { DatePicker, Collapse, Button, notification, Row, Col ,Select, Checkbox } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;

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
			vaccineprogramList: [],
			vaccineprogramList2:[],
			barnNumber: props.location.barnNo,
			vaccined: [],
			pen_id:0
		}
		this.onAdd = this.onAdd.bind(this);
		//this.handleChange = this.handleChange.bind(this);
		//this.getVaccineProgram = this.getVaccineProgram.bind(this);
	}

	componentDidMount(){
		//this.getVaccineProgram();
		this.getVaccinePen();
		this.getVaccinePen2();

		
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
		
	    fetch("http://farm-ing.co:4000/vaccine_pen/"+this.state.barnNumber)
	    .then(response => response.json())
	    
	    .then(response => this.setState({ vaccineprogramList: response.data}))
	    

	    .catch(err => console.error(err))
	}

	getVaccinePen2() {
		console.log("get" ,"http://farm-ing.co:4000/vaccine_pen/"+this.state.barnNumber)
	    fetch("http://farm-ing.co:4000/vaccine_pen2/"+this.state.barnNumber)
	    .then(response => response.json())
	    
	    .then(response => this.setState({ vaccineprogramList2: response.data}))
	    

	    .catch(err => console.error(err))
	}
	
	onAdd(a,barnNo) {
		//selected.map(function(item) {
			//console.log('http://farm-ing.co:4000/vaccine_pen/'+this.state.barnNumber+"/"+this.state.pen_id+'/add')
			fetch('http://farm-ing.co:4000/vaccine_pen/'+barnNo+"/"+a+'/add')
		    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','เพิ่มการวัคซีน','บันทึกข้อมูลสำเร็จ');
	    			this.getVaccinePen();
	    		} else {
	    			noti('error','เพิ่มการวัคซีน','บันทึกข้อมูลล้มเหลว');
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

	/*handleChange(value) {
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
	    //.catch(err => console.error(err))
	//} 

	render() {
		let {vaccineprogramList} = this.state;
		let {vaccineprogramList2} = this.state;
		let {barnNo} = this.props.location;
		let {barnNumber} = this.state;
		console.log(this.state.vaccineprogramList)	
		return(
			<div>
				<Header thisPage={"วัคซีนโปรแกรมของเล้าที่ : "+ barnNo}/>
				<div className="myBody">
					<div className="mySelect myBigFont">
					</div>
					{/*<Select placeholder="เลือกคอก" style={{ width: 120 }} onChange={this.handleChange} className="myBigFont">
    					<Option value='1'><div className="myBigFont">คอก 1</div></Option>
    					<Option value='2'><div className="myBigFont">คอก 2</div></Option>
    					<Option value='3'><div className="myBigFont">คอก 3</div></Option>
    					<Option value='4'><div className="myBigFont">คอก 4</div></Option>
    					<Option value='5'><div className="myBigFont">คอก 5</div></Option>
    				</Select>*/}
    				<Show2 onAdd={this.onAdd} vaccineprogramList2={vaccineprogramList2}/>
    				<div style={{marginTop:15, marginBottom:15}}>ฉีดวันที่ <DatePicker placeholder="เลือกวันที่"/></div>
    				<Show  onAdd={this.onAdd} vaccineprogramList={vaccineprogramList} barnNo={barnNo} />
    				{/*<Button type='danger' style={{align:right}}>รีเซ็ททั้งหมด</Button>*/}
    			</div>
    			<Footer/>
    		</div>
			
		);
	}
}

export default Vaccine;