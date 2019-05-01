import React from 'react';
import {Button, Checkbox, Form, FormLayout, TextField} from '@shopify/polaris';

export default class FormExample extends React.Component {
  state = {
    newsletter: false,
    email: '',
  };

  render() {
    const {newsletter, email} = this.state;

    return (
      <div style={{width: '500px', margin: '40px auto'}}>
        <Form onSubmit={this.handleSubmit} action='/5553' method='post'>
          <FormLayout>
            <Checkbox
              label="Sign up for the Polaris newsletter"
              checked={newsletter} 
              onChange={this.handleChange('newsletter')}
            />

            <TextField
              value={email}
              onChange={this.handleChange('email')}
              label="Email"
              type="email"
              helpText={
                <span>
                  We’ll use this email address to inform you on future changes to
                  Polaris.
                </span>
              }
            />

            <Button submit>Submit</Button>
          </FormLayout>
        </Form>
      </div>
    );
  }

  handleSubmit = (event) => {
    this.setState({newsletter: false, email: ''});
  };

  handleChange = (feild) => {
    return (value) => this.setState({[feild]: value});
  };
}
