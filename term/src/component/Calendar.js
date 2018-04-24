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
    		<Header thisPage="แบบประเมิน"/>
    			<div>
					{/*<div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4}}>
					    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
					</div>*/}
					<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScyVRDFaDcqJqSzvbUWtgVGOal9xLOvGW2IEG7YoB5WGNCrXA/viewform?embedded=true" width="100%" height="2000" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
				</div>
			<Footer/>
		</div>	
	  
    );
  }
}

export default CalendarPage;

