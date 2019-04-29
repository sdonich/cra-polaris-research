import React from 'react';
import {ActionList, Button, Popover} from '@shopify/polaris';

export default class ActionListExample extends React.Component {
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
      <Button onClick={this.togglePopover}>More actions</Button>
    );

    const iconX = (
      <img style={{height: '20px', width: '20px'}}
        src='https://images.vexels.com/media/users/3/127637/isolated/preview/0237c45fb5571dfb63b75d1103ed745d-fire-icon-svg-by-vexels.png'
        alt="Testing"
      />
    )

    return (
      <div style={{height: '500px'}}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
          sectioned
          preferredPosition="mostSpace"
        >
          <ActionList
            sections={
              [
                {
                  title: 'File options',
                  items: [
                    {content: 'Import file', icon: 'import'},
                    {content: 'Export file', icon: 'export'}
                  ]
                },
                {
                  title: 'Other options',
                  items: [
                    {content: 'Print file', icon: 'print'},
                    {content: 'Warning', icon: iconX}
                  ]
                }
              ]
            }
          />
        </Popover>
      </div>
    );
  }
}
