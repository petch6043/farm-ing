import { Checkbox, Row, Col } from 'antd';
import React, { Component } from 'react';

class checkboxlist extends Component {

  constructor(props){
    super(props)
    this.state ={
      done :false
    }
    this.toggle = this.toggle.bind(this)
  }


  toggle(){
    this.setState ({
          done : !this.state.done
      })
  }

    render() {
      return(

        <div>
        <Checkbox value={this.state.done} onClick={this.toggle} />
        </div>
        );
    }


  }

export default checkboxlist;