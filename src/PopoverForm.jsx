import React from 'react';
import {Button, FormLayout, Popover, Select, TextField} from '@shopify/polaris';

export default class PopoverFormExample extends React.Component {
  state = {
    active: true,
    tagValue: '',
    selected: 'with'
  };

  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  };

  handleTagChange = (value) => {
    this.setState({
      tagValue: value,
    });
  };

  handleSelectChange = (value) => {
    this.setState({selected: value})
  }

  render() {
    const activator = (
      <Button onClick={this.togglePopover} disclosure>
        Filter
      </Button>
    );

    return (
      <div style={{height: '280px'}}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
          sectioned
        >
          <FormLayout>
            <Select
              label="Show all customers where:"
              options={[
                {label: 'Tagged with', value: 'with'}, {label: 'Tagged without', value: 'without'}
              ]}
              value={this.state.selected}
              onChange={this.handleSelectChange}
            />
            <TextField
              label="Tags"
              value={this.state.tagValue}
              onChange={this.handleTagChange}
            />
            <Button size="slim">Add filter</Button>
          </FormLayout>
        </Popover>
      </div>
    );
  }
}
