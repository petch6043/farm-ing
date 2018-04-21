import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './barn/Add';
import Show from './transfer/Show';
import Createmenu_transfer from './Createmenu_transfer';
import Create_barn from './Create_barn';
import { Row, Col } from 'antd';
import { Collapse } from 'antd';
import { Menu, Button, notification, Icon } from 'antd';
import { DatePicker } from 'antd';
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



class Transfer_barn_select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BarnList: []
		}
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
	    		active: 1
	    	}),
	    })
	    .then((response) => {
	    	response.json().then((data) => {
	     		if(data == 1) {
	     			this.getBarn();
	     			noti('success','Add Barn','Sucessfully saved data.');
	     		} else {
	     			noti('error','Add Barn','Unable to save data.');
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

				<Header thisPage="Barn Select"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:15}}>
						<Panel header="Create Barn" key="2" style={customPanelStyle} className="myBigFont ">
							<Add onAdd={this.onAdd} BarnList={BarnList}/>
						</Panel>
					</Collapse>

					<div><h2>Barn list: </h2></div>
					<Createmenu_transfer BarnList={BarnList}/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer_barn_select;