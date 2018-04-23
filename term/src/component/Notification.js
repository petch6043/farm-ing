import React, { Component } from 'react';
import { Button, Icon, Calendar, Collapse } from 'antd';
import { Row, Col } from 'antd';
import Header from './Header';
import Footer from './Footer';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

const Panel = Collapse.Panel;

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class Notification extends Component {
	render() {
		return (
			<div>
				<Header thisPage="แจ้งเตือน"/>
					<div  className="myCalendar" style={{padding:10}}>
						<Collapse accordion>
						    <Panel header="12/2/18 - 10:45 | หมูตายที่เล้า 4" key="1">
						      <p>หมูตายที่เล้า 4 จำนวณ 1 ตัว สาเหตุ: ไม่ทราบ</p>
						    </Panel>
						    <Panel header="22/1/18 - 12:00 | โปรแกรมวัคซีน 1 ต้องฉีดวันนี้ " key="2">
						      <p>โปรแกรมวัคซีน 1 ต้องฉีดวันนี้ สำหรับเล้า 1,2,4,6,7 และ 11</p>
						    </Panel>
						</Collapse>
					</div>
				<Footer/>
			</div>	
		  
		);
	}
}

export default Notification;

