import React, { Component } from 'react';
import {Button, Input, Col} from 'antd';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transfer: {
				pen_id: null,
				type: "",
				value: null,
				user_id: null
			}
		}
		this.addClick = this.addClick.bind(this);
	}

	addClick() {
		let {onAdd} = this.props;
		console.log(this.state.transfer);
		onAdd(this.state.transfer);
		this.setState({
			transfer: {
				pen_id: null,
				type: "",
				value: null,
				user_id: null
			}
		});
	}

	render() {
		let {transfer} = this.state;
		return(
			<div>
				<Col span={12}>
				<Input addonBefore="Pen ID : " 
				value={transfer.pen_id}
				onChange={e => this.setState({ transfer: { ...transfer, pen_id: e.target.value }})}
				/></Col>
				<br/><br/>

				<Col span={12}><Input addonBefore="Type : "
				value={transfer.type}
				onChange={e => this.setState({ transfer: { ...transfer, type: e.target.value }})}
				/></Col>
				<br/><br/>

				<Col span={12}><Input addonBefore="Value :"
				value={transfer.value}
				onChange={e => this.setState({ transfer: { ...transfer, value: e.target.value }})}
				/></Col>
				<br/><br/>

				<Col span={12}><Input addonBefore="User ID :"
				value={transfer.user_id}
				onChange={e => this.setState({ transfer: { ...transfer, user_id: e.target.value }})}
				/></Col>
				<br/><br/>

				<Col span={24}>
				<Button type="primary" ghost onClick={this.addClick}>Submit</Button>
				</Col>
        	</div>
		);
	}
}

export default Add;