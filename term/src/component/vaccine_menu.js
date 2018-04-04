import React, { Component } from 'react';
import Vaccine from './Vaccine';
import vaccine_pen from './vaccine_pen';
import vaccine_type from './vaccine_type';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

class vaccine_menu extends Component {
  render() {
    return (

    	<div>
				<Link to="/vaccine">Vaccine</Link>
				<Link to="/vaccine_pen">Vaccine_pen</Link>
				<Link to="/vaccine_type">Vaccine_type</Link>
		</div>

    	
    );
  }
}

export default vaccine_menu;