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
    		<Header thisPage="Notification"/>
    			<div  className="myCalendar" style={{padding:10}}>
					<Collapse accordion>
					    <Panel header="12/2/18 - 10:45 | Pig died in barn 4" key="1">
					      <p>It is tough to lose any pet, but, mini pigs tend to take a small piece of your heart with them when they pass away. This seems to hurt even more if death occurs suddenly without explanation.</p>
					    </Panel>
					    <Panel header="22/1/18 - 12:00 | Vaccine program 1 is due today " key="2">
					      <p>Autogenous vaccines are bacterial vaccines that are manufactured from the specific pathogenic bacteria isolated from the diseased pig.</p>
					    </Panel>
					</Collapse>
				</div>
			<Footer/>
		</div>	
	  
    );
  }
}

export default Notification;

