import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}


class myForm extends Component {
	constructor(props) {
		super(props);
	}

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
		let {BarnList} = this.props;
		const data = BarnList;
		var allBarn = [1,2,3,4,5,6,7,8,9,10]
		var closedBarn = []
		var openBarn = []
		var i
		for (i = 0; i < data.length; i++) {
		    if(data[i].active==1){
		    	openBarn.push(data[i].name)
		    }
		}
		closedBarn = arr_diff(allBarn,openBarn)
		console.log(closedBarn)
		 console.log('barnList: '+data) 
    	const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (



      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Select"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: 'Please select a Barn!' },
            ],
          })(


            <Select placeholder="Please select a Barn">

            {  
     	
     	
          closedBarn.map((x) =>

   			<Option value={x}>Barn {x}</Option>
          
         
        )}
              
            </Select>
          )}
        </FormItem>
        <FormItem className="myFormItem">
					{getFieldDecorator('open_age', {
					rules: [{ required: true, message: 'Please input Age!' }],
					})(<Input placeholder="age" />)}
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

	send(barn) {
		let {onAdd} = this.props;
		onAdd(barn);
	}


	render() {
		let {BarnList} = this.props;
		return(
			<div>
				<AddForm send={this.send} BarnList={BarnList}/>
        	</div>
		);
	}
}

export default Add;