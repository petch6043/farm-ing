import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './Barn/Add';
import Show from './Transfer/Show';
import CreateMenu from './Transfer/CreateMenu';
import { Row, Col, Collapse, Menu, Button, notification, Icon, DatePicker } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

const SubMenu = Menu.SubMenu;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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



class TransferSelectBarn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BarnList: [],
			dateSelected : ""
		}
		this.onChange = this.onChange.bind(this);
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getBarn();
	}
	getBarn() {
	    fetch("http://206.189.35.130:4000/barn")
	    .then(response => response.json())
	    .then(response => this.setState({ BarnList: response.data}))
	    .catch(err => console.error(err))
	}
	onChange(date, dateString) {
		this.setState({dateSelected:dateString})
		console.log("xxxx"+this.state.dateSelected)
	}

	onAdd(barn) {
	    fetch('http://206.189.35.130:4000/barn/open', {
	    	method: 'POST',
	    	headers: {
	    		Accept: 'application/json',
	    		'Content-Type': 'application/json',
	    	},
	    	body: JSON.stringify({
	    		name: barn.name,
	    		open_age: barn.open_age,
	    		user_id: 1,
	    		open_date: this.state.dateSelected,
	    		active: 1
	    	}),
	    })
	    .then((response) => {
	    	response.json().then((data) => {
	     		if(data == 1) {
	     			this.getBarn();
	     			noti('success','เปิดเล้า','การบันทึกข้อมูลสำเร็จ');
	     		} else {
	     			noti('error','เปิดเล้า','การบันทึกข้อมูลล้มเหลว');
	     		}
     	    });
	    })
	    .catch(err => {
	     	noti('error','Add Barn', err);
	    })
	}
	

	render() {
		let {BarnList} = this.state;
		return(
			<div>

				<Header thisPage="เคลื่อนย้าย"/>
				<div className="myBody">

					<div><h2>เลือกเล้า: </h2></div>
					<CreateMenu BarnList={BarnList}/>

					<Collapse bordered={false} style={{marginTop:10}}>
						<Panel header="เปิดเล้า" key="2" style={customPanelStyle} className="myBigFont ">
							
							
							<div className="myInput">
								<DatePicker onChange={this.onChange} placeholder="เลือกวันที่"/>
							</div>
							<Add onAdd={this.onAdd} BarnList={BarnList}/>
						</Panel>
					</Collapse>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default TransferSelectBarn;