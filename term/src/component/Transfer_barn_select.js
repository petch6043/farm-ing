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



class Transfer_barn_select extends Component {
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
	    		barn_id: transfer.barn_id,
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
		return(
			<div>

				<Header thisPage="Barn Select"/>
				<div className="myBody">
				<div align="center">
				<Menu
            	onClick={this.handleClick}
          		mode="inline"
                   style={{ width: 300 }}>
				 <Menu.Item>
                   <Link to={{pathname : '/transfer' , Barn_no:'1' }}>Barn 1</Link>
                   </Menu.Item>

              <Menu.Item >
                  <Link to={{pathname : '/transfer' , Barn_no:'2' }}>Barn 2</Link>
                   </Menu.Item>

              <Menu.Item>
                  <Link to={{pathname : '/transfer' , Barn_no:'3' }}>Barn 3</Link>
                   </Menu.Item>

              <Menu.Item >
                  <Link to={{customPanelStylehname : '/transfer' , Barn_no:'4' }}>Barn 4</Link>
                   </Menu.Item>
                  
              <Menu.Item>
                  <Link to={{pathname : '/transfer' , Barn_no:'5' }}>Barn 5</Link>
                   </Menu.Item>
                  
              
          </Menu>
          </div>
					<Collapse bordered={false} style={{marginBottom:20}}>
						
							<Panel header="Create Barn" key="2" style={customPanelStyle}>
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>

					
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer_barn_select;