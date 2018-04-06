import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './transfer/Add';
import Show from './transfer/Show';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
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
			transferList: []
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getTransfers();
	}

	getTransfers() {
	    fetch("http://localhost:4000/transfer")
	    .then(response => response.json())
	    .then(response => this.setState({ transferList: response.data}))
	    .catch(err => console.error(err))
	}

	onAdd(transfer) {
	    fetch('http://localhost:4000/transfer/add', {
	    	method: 'POST',
	    	headers: {
	    		Accept: 'application/json',
	    		'Content-Type': 'application/json',
	    	},
	    	body: JSON.stringify({
	    		type: transfer.type,
	    		pen_id: transfer.pen_id,
	    		user_id: transfer.user_id,
	    		value: transfer.value
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
	    	noti('error','Add transfer','Failed to connect to database.');
	    })
	}

	render() {
		let {transferList} = this.state;
		return(
			<div>
				<Header thisPage="Transfer"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
						<Panel header="Add transfer" key="2" style={customPanelStyle}>
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>
					<Show transferList={transferList}/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer;