import React from 'react';
import {ActionList, Button, Popover} from '@shopify/polaris';

export default class PopoverContentExample extends React.Component {

  state = {
    active: false,
  };


  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  };

  render() {
    const activator = (
      <Button onClick={this.togglePopover}>Sales channels</Button>
    );
    return (
      <div style={{height: '500px'}}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
        >
          <Popover.Pane fixed>
            <Popover.Section>
              <p>Available sales channels</p>
            </Popover.Section>
          </Popover.Pane>
          <Popover.Pane>
            <ActionList
              items={[
                {content: 'Online store'},
                {content: 'Facebook'},
                {content: 'Shopify POS', onAction:() => {console.log('test of action list')}},
              ]}
            />
          </Popover.Pane>
        </Popover>
      </div>
    );
  }
}

