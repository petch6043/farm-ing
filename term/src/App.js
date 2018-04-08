import React, { Component } from 'react';
import Home from './component/Home';
import Transfer from './component/Transfer';
import Food from './component/Food';
import Vaccine from './component/Vaccine';
import Report from './component/Report';
import Login from './component/Login';
import Calendar from './component/Calendar';
import CalendarPage from './component/Calendar';
import vaccine_menu from './component/vaccine_menu';
import vaccine_pen from './component/vaccine_pen';
import vaccine_type from './component/vaccine_type';
import vaccine_program from './component/vaccine_program';
import vaccine_urgent from './component/vaccine_urgent';
import Selectbarnfood from './component/Selectbarnfood';
import Transfer_report from './component/Transfer_report';
import Health_report from './component/Health_report';

import Transfer_barn_select from './component/Transfer_barn_select';
import Create_barn from './component/Create_barn';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
    	<div>
    		<Router>
    			<Switch>
	    			<Route exact path="/" component={Home} />
	    			<Route path="/transfer" component={Transfer} />
	    			<Route path="/transfer_barn_select" component={Transfer_barn_select} />
	    			<Route path="/food" component={Food} />
	    			<Route path="/vaccine_menu" component={vaccine_menu} />
	    			<Route exact path="/vaccine" component={Vaccine} />
	    			<Route path="/vaccine_pen" component={vaccine_pen} />
	    			<Route path="/vaccine_type" component={vaccine_type} />
	    			<Route path="/vaccine_program" component={vaccine_program} />
	    			<Route path="/vaccine_urgent" component={vaccine_urgent} />
	    			<Route path="/report" component={Report} />
	    			<Route path="/login" component={Login} />
	    			<Route path="/Transfer_report" component={Transfer_report} />
	    			<Route path="/Health_report" component={Health_report} />
	    			<Route path="/calendar" component={CalendarPage} />
	    			<Route path="/selectbarnfood" component={Selectbarnfood} />
	    			<Route path="/Create_barn" component={Create_barn} />
	    			<Route path="/calendar" component={Calendar}/>
        		</Switch>
	         </Router>
	    </div>
    );
  }
}

export default App;
 