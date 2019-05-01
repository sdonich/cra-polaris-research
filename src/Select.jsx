import React from 'react';
import {Card, FormLayout, InlineError, Link, Select, Stack, TextField, TextStyle} from '@shopify/polaris';

export default class App extends React.Component {
  state = {
    weight: '',
    unit: '',
  };

  render() {
    const {weight, unit} = this.state;
    const unitSelectID = 'unit';
    const errorMessage = this.generateErrorMessage();
    const formGroupMarkup = (
      <Stack vertical spacing="extraTight">
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="Product weight"
              type="number"
              value={weight}
              placeholder='enter your weight'
              onChange={this.handleChange('weight')}
              error={Boolean(!weight && unit)}
            />
            <Select
              id={unitSelectID}
              label="Unit of measure"
              placeholder="Select"
              options={
                [
                  'oz', 'g', 'kg', 'lb', {
                    options: ['Dohrena'],
                    title: 'Special unit'
                  }
                ]
              }
              value={unit}
              onChange={this.handleChange('unit')}
              error={Boolean(!unit && weight)}
            />
          </FormLayout.Group>
        </FormLayout>
        <InlineError message={errorMessage} fieldID={unitSelectID} />
      </Stack>
    );

    return (
      <div style={{width: '600px', margin: '40px auto'}}>
        <Card sectioned>{formGroupMarkup}</Card>
      </div>
    );
  }

  handleChange = (field) => (value) => {
    this.setState({[field]: value});
  };

  generateErrorMessage = () => {
    const {weight, unit} = this.state;
    const weightError =
      !weight && unit ? 'The numeric weight of the product ' : '';
    const unitError =
      !unit && weight ? 'The unit of measure for the product weight' : '';

    if (!weightError && !unitError) {
      return '';
    }

    return (
      <span>
        <TextStyle variation="negative">
          <p>
            {`${weightError}${unitError} is required when weight based shipping rates are enabled. `}
            <Link>Manage shipping</Link>
          </p>
        </TextStyle>
      </span>
    );
  };
}
