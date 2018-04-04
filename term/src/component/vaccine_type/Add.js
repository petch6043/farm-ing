import React, { Component } from 'react';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vaccinetype: {
				
				type_name: "",
				age: 0,
				isRequired: 0
			}
		}
		this.addClick = this.addClick.bind(this);
	}

	addClick() {
		let {onAdd} = this.props;
		console.log(this.state.vaccinetype);
		onAdd(this.state.vaccinetype);
		this.setState({
			vaccinetype: {
				
				type_name: "",
				age: 0,
				isRequired: 0
			}
		});
	}

	render() {
		let {vaccinetype} = this.state;
		return(
			<div>
          		
          <input
          value={vaccinetype.type_name}
          onChange={e => this.setState({ vaccinetype: { ...vaccinetype, type_name: e.target.value }})}
          />
          <input
          value={vaccinetype.age}
          onChange={e => this.setState({ vaccinetype: { ...vaccinetype, age: e.target.value }})}
          />
          <input
          value={vaccinetype.isRequired}
          onChange={e => this.setState({ vaccinetype: { ...vaccinetype, isRequired: e.target.value }})}
          />
          
          <button onClick={this.addClick}>Add vaccinetype</button>
        </div>
		);
	}
}

export default Add;