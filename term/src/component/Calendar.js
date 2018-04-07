import React, { Component } from 'react';
import { Button, Icon, Calendar } from 'antd';
import { Row, Col } from 'antd';
import Header from './Header';
import Footer from './Footer';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class CalendarPage extends Component {
  render() {
    return (
    	<div>
    		<Header thisPage="Calendar"/>
    			<div align='center' className="myCalendar">
					<div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4}}>
					    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
					</div>
				</div>
			<Footer/>
		</div>	
	  
    );
  }
}

export default CalendarPage;

