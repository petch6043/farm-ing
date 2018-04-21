import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

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
		const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				

				<FormItem
        		>
          			{getFieldDecorator('food_type', {
            		rules: [
              		{required: true, message: 'กรุณาใส่ประเภท!' },
            		],
          			})(
            		<Select placeholder="เลือกประเภท">
	   					<Option value='310'>310</Option>
	   					<Option value='320'>320</Option>
	   					<Option value='430'>430</Option>
            		</Select>
          		)}
        </FormItem>

				<FormItem className="myFormItem">
					{getFieldDecorator('amount', {
					rules: [{ required: true, message: 'กรุณาใส่ปริมาณอาหาร!' }],
					})(<Input placeholder="ปริมาณ" />)}
				</FormItem>
				<FormItem>
					<Button type="primary" ghost htmlType="ยืนยัน" className="login-form-button">ยืนยัน</Button>
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

	send(food) {
		let {onAdd} = this.props;
		onAdd(food);
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