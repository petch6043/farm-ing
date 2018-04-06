import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox } from 'antd';
const FormItem = Form.Item;

class myForm extends Component {
	handleSubmit = (e) => {
		let {send} = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				send(values);
				this.props.form.resetFields();
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem className="myFormItem">
					{getFieldDecorator('pen_id', {
					rules: [{ required: true, message: 'Please input Pen ID!' }],
					})(<Input placeholder="Pen ID" />)}
				</FormItem>
				<FormItem className="myFormItem">
					{getFieldDecorator('type', {
					rules: [{ required: true, message: 'Please input Type!' }],
					})(<Input placeholder="Type" />)}
				</FormItem>
				<FormItem className="myFormItem">
					{getFieldDecorator('value', {
					rules: [{ required: true, message: 'Please input Value!' }],
					})(<Input placeholder="Value" />)}
				</FormItem>
				<FormItem className="myFormItem">
					{getFieldDecorator('user_id', {
					rules: [{ required: true, message: 'Please input User ID!' }],
					})(<Input placeholder="User ID" />)}
				</FormItem>
				<FormItem>
					<Button type="primary" ghost htmlType="submit" className="login-form-button">Submit</Button>
				</FormItem>
			</Form>
		)
	}
}

const AddForm = Form.create()(myForm);

class Add extends Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}

	send(transfer) {
		let {onAdd} = this.props;
		onAdd(transfer);
	}


	render() {
		return(
			<div>
				<AddForm send={this.send}/>
        	</div>
		);
	}
}

export default Add;