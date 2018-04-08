import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './transfer/Add';
import Show from './transfer/Show';
import Selectmenu_transfer from './Selectmenu_transfer';
import Create_barn from './Create_barn';
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


class Transfer_barn_select extends Component {
	

	render() {
		return(
			<div>
				<Header thisPage="Barn Select"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						{/*<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
						<Panel header="Add transfer" key="2" style={customPanelStyle}>
							<Add onAdd={this.onAdd}/>
						</Panel>*/}
						<Panel header="Select Barn" key="1" style={customPanelStyle}>
							<Selectmenu_transfer/>
						</Panel>
					</Collapse>
					{/*<Show transferList={transferList}/>*/}
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Transfer_barn_select;