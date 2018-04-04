import React, { Component } from 'react';
import Vaccine from './Vaccine';
import vaccine_pen from './vaccine_pen';
import vaccine_type from './vaccine_type';
import { Button, Icon } from 'antd';

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
				<Link to="/vaccine"><Button>Vaccine</Button></Link>
				<Link to="/vaccine_pen"><Button>Vaccine_pen</Button></Link>
				<Link to="/vaccine_type"><Button>Vaccine_type</Button></Link>
		</div>

    	
    );
  }
}

export default vaccine_menu;