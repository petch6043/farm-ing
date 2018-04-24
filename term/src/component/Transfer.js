import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import MoveOut from './Transfer/MoveOut';
import MoveIn from './Transfer/MoveIn';
import Show from './Transfer/Show';
import { Popconfirm, Button, notification, Collapse, DatePicker } from 'antd';


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
			barnNumber: props.location.Barn_no,
			dateIsSelected: false,
			dateSelected: ""

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

	getTransfersByDate(dateSelected){

		fetch("http://206.189.35.130:4000/transfer/" + this.state.barnNumber + "/" + dateSelected)
	    .then(response => response.json())
	    .then(response => this.setState({ transferList: response.data}))
	    .catch(err => console.error(err))
	}


	onChange(date, dateString) {
		this.setState({dateSelected:dateString})
		console.log("xxxx"+this.state.dateSelected)
		console.log(date, dateString)
		console.log("http://206.189.35.130:4000/transfer/" + this.state.barnNumber + "/" + dateString);
		fetch("http://206.189.35.130:4000/transfer/" + this.state.barnNumber + "/" + dateString)
	    .then(response => response.json())
	    .then(response => {
	    	if(dateString!=""){
	    		console.log("selected date")
	    		this.setState({dateIsSelected: true})
	    	} else {
	    		console.log("deselected date")
	    		this.setState({dateIsSelected: false})
	    	}
	    	this.setState({ transferList: response.data })
	    })
	    .catch(err => console.error(err))
	}

	onAdd(transfer) {
		let a = 0
		if (transfer.from_barn_name) {
			a = transfer.from_barn_name 
		} else {
			a = this.state.barnNumber
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
	    		from_barn_name: a,
	    		selected_date: this.state.dateSelected
	    	}),
	    })
	    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','เพิ่มการเคลื่อนย้าย','บันทึกข้อมูลสำเร็จ');
	    			this.getTransfersByDate(this.state.dateSelected);
	    		} else {
	    			noti('error','เพิ่มการเคลื่อนย้าย','บันทึกข้อมูลล้มเหลว');
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
		let {transferList, dateIsSelected} = this.state;
		let {Barn_no} = this.props.location;
		// console.log(Barn_no);
		return(

			<div>

				<Header thisPage={"เล้า " + Barn_no}/>

				<div className="myBody">

					<div className="mySelect">
						<DatePicker onChange={this.onChange} placeholder="เลือกวันที่"/>
						<Popconfirm placement="bottomLeft" title="คุณแน่ใจหรือไม่ว่าจะปิดเล้านี้" onConfirm={this.closeBarn} okText="Yes" cancelText="No">
		       				<Button style={{marginLeft: 15, height:42}}>ปิดเล้า</Button>
	      				</Popconfirm>
	      			</div>
					<Collapse bordered={false} style={{marginBottom:10}}>
						<Panel header="ย้ายเข้า" key="1" style={customPanelStyle} className="myBigFont">
							<MoveIn onAdd={this.onAdd}/>
						</Panel>
						<Panel header="ย้ายออก" key="2" style={customPanelStyle} className="myBigFont">
							<MoveOut onAdd={this.onAdd}/>
						</Panel>
					</Collapse>

					<Show transferList={transferList} dateIsSelected={dateIsSelected}/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer;