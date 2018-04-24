import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './Food/Add';
import Show from './Food/Show';
import { Collapse, notification, DatePicker} from 'antd';

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

class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodList: [],
			barnNo: props.location.barnNumber,
			dateIsSelected: false,
			dateSelected: ""
		}
		this.onAdd = this.onAdd.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
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
 	getFoodByDate(dateSelected){

		fetch("http://206.189.35.130:4000/food/" + this.state.barnNo + "/" + dateSelected)
	    .then(response => response.json())
	    .then(response => this.setState({ foodList: response.data}))
	    .catch(err => console.error(err))
	}
	onChange(date, dateString) {
 		/*fetch("http://206.189.35.130:4000/food/"+this.state.barnNo + "/" + dateString)
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
       	.catch(err => console.error(err))*/
       	this.setState({dateSelected:dateString})
		console.log("xxxx"+this.state.dateSelected)
		console.log(date, dateString)
		console.log("http://206.189.35.130:4000/food/" + this.state.barnNo + "/" + dateString);
		fetch("http://206.189.35.130:4000/food/" + this.state.barnNo + "/" + dateString)
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
 		console.log(this.state.dateSelected)
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
          		selected_date: this.state.dateSelected	    		
	    	}),
	    })

	    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','ให้อาหาร','เก็บข้อมูลสำเร็จ');
	    			this.getFoodByDate(this.state.dateSelected);

	    		} else {
	    			noti('error','ให้อาหาร','เก็บข้อมูลไม่สำเร็จ');
	    		}
           	});
	    })
	    .catch(err => {

	    	noti('error','ให้อาหาร','Failed to connect to database.');
	    })

	}

	onDelete(food_id) {
			fetch('http://farm-ing.co:4000/food/delete/'+food_id)
		    .then((response) => {
	    	response.json().then((data) => {
	    		if(data == 1) {
	    			noti('success','ลบรายการ','บันทึกข้อมูลสำเร็จ');
	    			this.getFoodByDate(this.state.dateSelected);
	    		} else {
	    			noti('error','ลบรายการ','บันทึกข้อมูลล้มเหลว');
	    		}
           	});
	    })
	    .catch(err => {
	    	noti('error','Delete food',err);
	    })
	}
 
	render() {
		let {foodList, dateIsSelected} = this.state;
		let {barnNumber} = this.props.location;
		return(


			<div>
				<Header thisPage={"เล้า " + barnNumber}/>
				<div className="myBody">
					<div className="mySelect">
						<DatePicker onChange={this.onChange} placeholder="เลือกวันที่"/>
	      			</div>
					<Collapse bordered={false} style={{marginBottom:10}}>
						<Panel header="เพิ่ม" key="2" style={customPanelStyle} className="myBigFont">
							<Add onAdd={this.onAdd}/>
						</Panel>
					</Collapse>
					


					<Show foodList={foodList} dateIsSelected={dateIsSelected} onDelete={this.onDelete}/>
				</div>
				<Footer/>
			</div>

		);
	}
}

export default Food;