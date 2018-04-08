import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './vaccine_program/Add';
import Show from './vaccine_program/Show';
import { DatePicker } from 'antd';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function onChange(date, dateString) {
	console.log(date, dateString);
}

const noti = (type, msg, desc) => {
	notification[type]({
		message: msg,
		description: desc,
	});
};

const Panel = Collapse.Panel;
const customPanelStyle = {
	background: '#f7f7f7',
	borderRadius: 4,
	marginBottom: 5,
	border: 0,
	overflow: 'hidden',
};


class vaccine_program extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccineprogramList: []
		}
	}

	componentDidMount(){
		this.getVaccineProgram();
	}

	getVaccineProgram = _ => {
	    fetch("http://localhost:4000/vaccine_program")
	      .then(response => response.json())
	      .then(response => this.setState({ vaccineprogramList: response.data}))
	      .catch(err => console.error(err))
	}


	render() {
		let {vaccineprogramList} = this.state;
		return(
			<div>
				<Header thisPage="Vaccine Program"/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="Select date" key="1" style={customPanelStyle}>
							<DatePicker onChange={onChange} />
						</Panel>
<<<<<<< HEAD
						<Panel header="Select Barn" key="2" style={customPanelStyle}>
							<Selectmenu/>
						</Panel>	

=======
>>>>>>> e05dcdb88782e584194085ec592f59483b589428
						
					</Collapse>	
					<Show vaccineprogramList={vaccineprogramList}/>

					
				
				
				</div>
			
				<Footer/>
			</div>
			
		);
	}
}

export default vaccine_program;