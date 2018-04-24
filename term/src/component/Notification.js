import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Collapse, Table, Badge } from 'antd';

const Panel = Collapse.Panel;

class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: []
		}
	}

	componentDidMount(){
		this.getTasks();
	}

	getTasks() {
	    fetch("http://farm-ing.co:4000/task/")
	    .then(response => response.json())
	    .then(response => this.setState({ taskList: response.data}))
	    .catch(err => console.error(err))
	}

	render() {
		let {taskList} = this.state;
		return (
			<div>
			{console.log(taskList)}
				<Header thisPage="แจ้งเตือน"/>
				<div style={{padding:10}}>
					{taskList.map((x) =>
						<Collapse accordion>
						    <Panel header={'ฉีดวัคซีนให้เล้า '+x.name+' ภายใน '+x.due+' วัน'} key="x">
						      <p>เล้า {x.name} มีกำหนดฉีดโปรแกรมวัคซีนในวันที่ {x.program_date_formatted} (ภายใน {x.due} วัน)</p>
						    </Panel>
						</Collapse>
					 )}
				</div>
				<Footer/>
			</div>	
		  
		);
	}
}

export default Notification;

