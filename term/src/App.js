import React, { Component } from 'react';
import Home from './component/Home';
import Transfer from './component/Transfer';
import Food from './component/Food';
import Vaccine from './component/Vaccine';
import Report from './component/Report';
<<<<<<< HEAD
import Login from './component/Login';
=======

import vaccine_menu from './component/vaccine_menu';
import vaccine_pen from './component/vaccine_pen';
import vaccine_type from './component/vaccine_type';



import daily from './component/daily';
import weekly from './component/weekly';
import monthly from './component/monthly';
import yearly from './component/yearly';


>>>>>>> 902329a84839d9ddd6a79f1499ea6f4b9555269c
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
	    			<Route path="/food" component={Food} />

	    			<Route path="/vaccine_menu" component={vaccine_menu} />
	    			<Route exact path="/vaccine" component={Vaccine} />
	    			<Route path="/vaccine_pen" component={vaccine_pen} />
	    			<Route path="/vaccine_type" component={vaccine_type} />
	    			

	    			<Route path="/report" component={Report} />
<<<<<<< HEAD
	    			<Route path="/login" component={Login} />
=======
	    			
	    			<Route path="/daily" component={daily} />
	    			<Route path="/weekly" component={weekly} />
	    			<Route path="/monthly" component={monthly} />
	    			<Route path="/yearly" component={yearly} />

>>>>>>> 902329a84839d9ddd6a79f1499ea6f4b9555269c
        		</Switch>
	         </Router>
	    </div>
    );
  }
}

export default App;
 