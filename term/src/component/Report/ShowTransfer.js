import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Button } from 'antd';

class ShowTransfer extends Component {
  render() {
    let {transferReport} = this.props;
    return(
    	<div>
    		{
    			transferReport.map(function(item) {
    				return (
    					<Link to={process.env.PUBLIC_URL + item.report_path} target='_blank'>
							<div><Button icon="file-excel" style={{marginBottom:10}}>{item.report_name}</Button></div>
						</Link>
    				)
    			})
    		}
    	</div>
    )
  }
}

export default ShowTransfer;