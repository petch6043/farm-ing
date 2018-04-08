import React, { Component } from 'react';

class ShowItem extends Component {
 render() {
  let {item} = this.props;
  return(
   <div>
    Food Type: {item.food_type}, Amount: {item.amount}, Time: {item.time}
   </div>
  );
 }
}

export default ShowItem;