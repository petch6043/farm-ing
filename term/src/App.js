import React, { Component } from 'react';
import Home from './component/Home';

import Transfer from './component/Transfer';
import TransferSelectBarn from './component/TransferSelectBarn';

import Food from './component/Food';
import FoodSelectBarn from './component/FoodSelectBarn';

import Vaccine from './component/Vaccine';
import VaccineSelectType from './component/VaccineSelectType';
import VaccineSelectBarn from './component/VaccineSelectBarn';

import Report from './component/Report';
import ReportTransfer from './component/ReportTransfer';

import Login from './component/Login';
import Calendar from './component/Calendar';
import Notification from './component/Notification';
import User from './component/User';

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

	    			<Route exact path="/transfer" component={Transfer} />
	    			<Route path="/transfer/select" component={TransferSelectBarn} />

	    			<Route exact path="/food" component={Food} />
	    			<Route path="/food/select" component={FoodSelectBarn} />

	    			<Route exact path="/vaccine" component={Vaccine} />
	    			<Route path="/vaccine/menu" component={VaccineSelectType} />
	    			<Route path="/vaccine/select" component={VaccineSelectBarn} />

	    			<Route exact path="/report" component={Report} />
	    			<Route path="/report/transfer" component={ReportTransfer} />

	    			<Route path="/calendar" component={Calendar}/>
	    			<Route path="/notification" component={Notification}/>
	    			<Route path="/user" component={User}/>

	    			<Route path="/login" component={Login} />
        		</Switch>
	         </Router>
	    </div>
    );
  }
}

export default App;
 