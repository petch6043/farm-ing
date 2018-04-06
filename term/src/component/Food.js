import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './food/Add';
import Show from './food/Show';
import Selectmenu from './Selectmenu';
import { Collapse } from 'antd';
import { Button, notification } from 'antd';
import { DatePicker } from 'antd';

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
   foodList: []
  }
  this.onAdd = this.onAdd.bind(this);
 }

 componentDidMount(){
  this.getFood();
 }

 getFood = _ => {
     fetch("http://localhost:4000/food")
       .then(response => response.json())
       .then(response => this.setState({ foodList: response.data}))
       .catch(err => console.error(err))
 }

 onAdd(food) {
  console.log("A" + food);
      fetch('http://localhost:4000/food/add', {
          method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           pen_id: food.pen_id,
           amount: food.amount,
           food_type: food.food_type,
           user_id: food.user_id
         }),
       })
       .then(this.getFoodList)
       .catch(err => console.error(err))
       console.log('added food')
 }


 render() {
  let {foodList} = this.state;
  return(
   <div>
    <Header thisPage="Food"/>
    <div className="myBody">
     <Collapse bordered={false} style={{marginBottom:20}}>
      <Panel header="Select barn" key="1" style={customPanelStyle}>
       <Selectmenu/>
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