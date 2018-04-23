import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './food/Add';
import Show from './food/Show';
import Selectmenu from './Selectmenu';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import { DatePicker } from 'antd';
import { Popconfirm } from 'antd';


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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

function onChange(date, dateString) {
	console.log(date, dateString);
}

class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodList: [],
			barnNo: props.location.barnNumber,
			dateIsSelected: false
		}
		this.onAdd = this.onAdd.bind(this);
		this.onChange = this.onChange.bind(this);
	}


 	componentDidMount(){
  		this.getFood();
 	}
 
	//fetching data from database named food
	getFood() {
    	fetch("http://206.189.35.130:4000/food/"+this.state.barnNo)
    	.then(response => response.json())
       	.then(response => this.setState({ foodList: response.data}))
       	.catch(err => console.error(err))
 	}

	onChange(date, dateString) {
 		fetch("http://206.189.35.130:4000/food/"+this.state.barnNo + "/" + dateString)
       	.then(response => response.json())
       	.then(response => {
	    	if(dateString!=""){
	    		console.log("selected date")
	    		this.setState({dateIsSelected: true})
	    	}else{
	    		console.log("deselected date")
	    		this.setState({dateIsSelected: false})
	    	}
	    	this.setState({ foodList: response.data })
	    })
       	.catch(err => console.error(err))
	}

	//posting data to the database named food
 	onAdd(food) {
	    fetch('http://206.189.35.130:4000/food/add', {
	    	method: 'POST',
	    	headers: {
	    		Accept: 'application/json',
	    		'Content-Type': 'application/json',
	    	},
	    	body: JSON.stringify({
          		user_id: 1,
          		barn_name: this.state.barnNo,
          		amount: food.amount,
          		food_type: food.food_type,
	    		
	    	}),
	    })

	    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','ให้อาหาร','เก็บข้อมูลสำเร็จ');
	    			this.getFood();

	    		} else {
	    			noti('error','ให้อาหาร','เก็บข้อมูลไม่สำเร็จ');
	    		}
           	});
	    })
	    .catch(err => {

	    	noti('error','ให้อาหาร','Failed to connect to database.');
	    })

}
 
	render() {
		let {foodList, dateIsSelected} = this.state;
		let {barnNumber} = this.props.location;
		let {barnNo} = this.state;
		return(


			<div>
				<Header thisPage={"เล้า " + barnNumber}/>
				<div className="myBody">
					<Collapse bordered={false} style={{marginBottom:20}}>
						<Panel header="เพิ่ม" key="2" style={customPanelStyle} className="myBigFont">
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>
					<div className="mySelect">
						<DatePicker onChange={this.onChange}/>
	      			</div>


					<Show foodList={foodList} dateIsSelected={dateIsSelected}/>
				</div>
				<Footer/>
			</div>

		);
	}
}

export default Food;