import React, { Component } from 'react';
import daily from './daily';
import weekly from './weekly';
import monthly from './monthly';
import yearly from './yearly';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

class Report extends Component {
  render() {
    return (
    	
    		<div>
				<Link to="/daily">daily</Link>
				<Link to="/weekly">weekly</Link>
				<Link to="/monthly">monthly</Link>
				<Link to="/yearly">yearly</Link>
			</div>
	
    );
  }
}

export default Report;
 