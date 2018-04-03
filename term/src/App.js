import React, { Component } from 'react';
import Home from './component/Home';
import Transfer from './component/Transfer';
import Food from './component/Food';
import Vaccine from './component/Vaccine';
import Report from './component/Report';
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
	    			<Route path="/vaccine" component={Vaccine} />
	    			<Route path="/report" component={Report} />
        		</Switch>
	         </Router>
	    </div>
    );
  }
}

export default App;
 