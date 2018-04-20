import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class myForm extends Component {
	handleSubmit = (e) => {
		let {send} = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				
				send(values);
				console.log(values)
				this.props.form.resetFields();
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				


				<FormItem
          			{...formItemLayout}
          			label="Select"
          			hasFeedback
        		>
          			{getFieldDecorator('type', {
            		rules: [
              		{required: true, message: 'Please select a type!' },
            		],
          			})(
            		<Select placeholder="Please select type">
            		
   					<Option value='Sold'>Sold</Option>
   					<Option value='Died'>Died</Option>
   					<Option value='Sick'>Sick</Option>
          
         
        		
              
            		</Select>
          		)}
        </FormItem>

				<FormItem className="myFormItem">
					{getFieldDecorator('value', {
					rules: [{ required: true, message: 'Please input Value!' }],
					})(<Input placeholder="Value" />)}
				</FormItem>
				
				<FormItem>
					<Button type="primary" ghost htmlType="submit" className="login-form-button">Submit</Button>
				</FormItem>
			</Form>
		)
	}
}

const AddForm = Form.create()(myForm);

class MoveOut extends Component {
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

export default MoveOut;