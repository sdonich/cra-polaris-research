import React from 'react';
import {Button, Card, FormLayout, InlineError, Select, Stack, TextField} from '@shopify/polaris';

export default class SeparateValidationErrorExample extends React.Component {
  state = {
    content: '',
  };

  render() {
    const {content} = this.state;
    const textFieldID = 'ruleContent';
    const isInvalid = this.isInvalid(content);
    const errorMessage = isInvalid
      ? 'Enter 3 or more characters for product type is equal to'
      : '';

    const formGroupMarkup = (
      <Stack wrap={false} alignment="leading" spacing="tight">
        <Stack.Item fill>
          <Stack distribution="fill" spacing="tight">
            <Select
              labelHidden
              label="Collection rule type"
              options={['Product type']}
            />
            <Select
              labelHidden
              label="Collection rule condition"
              options={['is equal to']}
            />
            <TextField
              labelHidden
              label="Collection rule content"
              error={isInvalid}
              id={textFieldID}
              value={content}
              onChange={this.handleChange}
              maxLength={50}
              showCharacterCount
            />
          </Stack>
          <div style={{marginTop: '4px'}}>
            <InlineError message={errorMessage} fieldID={textFieldID} />
          </div>
        </Stack.Item>
        <Button icon="delete" />
      </Stack>
    );

    return (
      <Card sectioned>
        <FormLayout>{formGroupMarkup}</FormLayout>
      </Card>
    );
  }

  handleChange = (content) => {
    this.setState({content});
  };

  isInvalid = (content) => {
    if (!content) {
      return true;
    }

    return content.length < 3;
  };
}
