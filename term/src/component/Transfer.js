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


class Transfer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transferList: [],
			barnNumber: props.location.Barn_no

		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		
		this.getTransfers();

	}

	getTransfers() {
	    fetch("http://206.189.35.130:4000/transfer/"+this.state.barnNumber)
	    .then(response => response.json())
	    .then(response => this.setState({ transferList: response.data}))
	    .catch(err => console.error(err))
	}

	onAdd(transfer) {
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
	    		from_barn_name: transfer.from_barn_name
	    	}),
	    })
	    .then((response) => {
	    	
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			this.getTransfers();
	    			noti('success','Add transfer','Sucessfully saved data.');
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
				<Header_transfer thisPage={"Barn " + Barn_no}/>

				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Move in" key="2" style={customPanelStyle}>
							<MoveIn onAdd={this.onAdd}/>
						</Panel>
					</Collapse>
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Move out" key="2" style={customPanelStyle}>
							<MoveOut onAdd={this.onAdd}/>
						</Panel>
					</Collapse>

					<div className="mySelect">
						<DatePicker onChange={onChange} className="mySelectDate"/>
						
						<Popconfirm placement="bottomLeft" title="Are you sure to close this barn?" onConfirm={this.closeBarn} okText="Yes" cancelText="No">
		       				<Button className="myCloseBarn">Close barn </Button>
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