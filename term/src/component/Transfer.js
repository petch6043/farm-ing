import React, { Component } from 'react';
import Header_transfer from './Header_transfer';
import Footer from './Footer';
import Add from './transfer/Add';
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
	    		user_id: transfer.user_id,
	    		value: transfer.value
	    	}),
	    })
	    .then((response) => {
	    	console.log(response.json())
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
				
				<br/>
				<Popconfirm placement="bottomLeft" title="Are you sure to close this barn?" onConfirm={this.closeBarn()} okText="Yes" cancelText="No">
        
        <Button className="myCloseBarn">Close barn </Button>
      </Popconfirm>
      <DatePicker onChange={onChange} className="mySelectDate"/>
      	<br/>	
      	<br/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
							
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