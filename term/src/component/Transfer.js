import React, { Component } from 'react';
import Header_transfer from './Header_transfer';
import Footer from './Footer';
import MoveOut from './transfer/MoveOut';
import MoveIn from './transfer/MoveIn';
import Show from './transfer/Show';
import Createmenu_transfer from './Createmenu_transfer';
import Create_barn from './Create_barn';
import { Collapse } from 'antd';
import { Popconfirm, Button, notification } from 'antd';
import { DatePicker } from 'antd';

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

class Transfer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transferList: [],
			barnNumber: props.location.Barn_no
		}
		this.onAdd = this.onAdd.bind(this);
		this.onChange = this.onChange.bind(this);
		this.closeBarn = this.closeBarn.bind(this);
	}

	componentDidMount(){
		this.getTransfers();
	}

	getTransfers() {
	    fetch("http://206.189.35.130:4000/transfer/" + this.state.barnNumber)
	    .then(response => response.json())
	    .then(response => this.setState({ transferList: response.data}))
	    .catch(err => console.error(err))
	}

	onChange(date, dateString) {
		console.log("http://206.189.35.130:4000/transfer/" + this.state.barnNumber + "/" + dateString);
		fetch("http://206.189.35.130:4000/transfer/" + this.state.barnNumber + "/" + dateString)
	    .then(response => response.json())
	    .then(response => this.setState({ transferList: response.data}))
	    .catch(err => console.error(err))
	}

	onAdd(transfer) {
		let a = 0
		if (transfer.from_barn_name) {
			a=transfer.from_barn_name 
		}else{
			a=this.state.barnNumber
		}
	    fetch('http://206.189.35.130:4000/transfer/add', {
	    	method: 'POST',
	    	headers: {
	    		Accept: 'application/json',
	    		'Content-Type': 'application/json',
	    	},
	    	body: JSON.stringify({
	    		type: transfer.type,
	    		barn_name: this.state.barnNumber,
	    		user_id: 1,
	    		value: transfer.value,
	    		from_barn_name: a
	    	}),
	    })
	    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','Add transfer','Sucessfully saved data.');
	    			this.getTransfers();
	    		} else {
	    			noti('error','Add transfer','Unable to save data.');
	    		}
           	});
	    })
	    .catch(err => {
	    	noti('error','Add transfer',err);
	    })
	}

	closeBarn() {
	    fetch("http://206.189.35.130:4000/barn/close/"+this.state.barnNumber)
	    .then(response => response.json())
	    .then(response => this.setState({ transferList: response.data}))
	    .catch(err => console.error(err))
	}
	

	render() {
		let {transferList} = this.state;
		let {Barn_no} = this.props.location;
		let {barnNumber} = this.state;
		// console.log(Barn_no);
		return(

			<div>
				<Header_transfer thisPage={"เล้า " + Barn_no}/>

				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="ย้ายเข้า" key="1" style={customPanelStyle}>
							<MoveIn onAdd={this.onAdd}/>
						</Panel>
						<Panel header="ย้ายออก" key="2" style={customPanelStyle}>
							<MoveOut onAdd={this.onAdd}/>
						</Panel>
					</Collapse>
					
					<div className="mySelect">
						<DatePicker onChange={this.onChange}/>
						<Popconfirm placement="bottomLeft" title="คุณแน่ใจหรือไม่ว่าจะปิดเล้านี้" onConfirm={this.closeBarn} okText="Yes" cancelText="No">
		       				<Button style={{marginLeft: 15}}>ปิดเล้า</Button>
	      				</Popconfirm>
	      			</div>

					<Show transferList={transferList}/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer;