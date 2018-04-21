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
   barnNo: props.location.barnNumber
  }
  this.onAdd = this.onAdd.bind(this);
 }


 componentDidMount(){
  this.getFood();
  
 }
 
//fetching data from database named food
 getFood() {
 	console.log(this.state.barnNo);
     fetch("http://206.189.35.130:4000/food/"+this.state.barnNo)
       .then(response => response.json())
       .then(response => this.setState({ foodList: response.data}))
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
	    			this.getFood();
	    			noti('success','Add food','Sucessfully saved data.');
	    		} else {
	    			noti('error','Add food','Unable to save data.');
	    		}
           	});
	    })
	    .catch(err => {
	    	noti('error','Add food','Failed to connect to database.');
	    })
	    console.log(JSON.stringify({
	    		barn_name: this.state.barnNo,
	    		amount: food.amount,
	    		food_type: food.food_type,
	    		
	    	}));
}
 
 render() {

  let {foodList} = this.state;
 	let {barnNumber} = this.props.location;
 	console.log(barnNumber);
 	let {barnNo} = this.state;
  return(

   <div>
    <Header thisPage="Food" />
    <div className="myBody">
     <Collapse bordered={false} style={{marginBottom:20}}>
      <Panel header="Select date" style={customPanelStyle} className="myBigFont" >
      <DatePicker onChange={onChange}/>
      	
      </Panel>
      <Panel header="Add food" style={customPanelStyle} className="myBigFont">
      	<Add onAdd={this.onAdd}/>
      </Panel>

     </Collapse>
     <Show foodList={foodList}/>
    </div>
    <Footer/>
   </div>

  );
 }
}

export default Food;