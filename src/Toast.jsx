import React from 'react';
import {Button, Frame, Page, Toast} from '@shopify/polaris';

export default class ToastExample extends React.Component {
  state = {
    showToast: false,
  };

  render() {
    const {showToast} = this.state;
    const toastMarkup = showToast ? (
      <Toast
        content="Message sent"
        onDismiss={this.toggleToast}
        duration={500}
      />
    ) : null;

    return (
      <div style={{height: '250px'}}>
        <Frame>
          <Page title="Toast example">
            <Button onClick={this.toggleToast}>Show Toast</Button>
            {toastMarkup}
          </Page>
        </Frame>
      </div>
    );
  }

  toggleToast = () => {
    this.setState(({showToast}) => ({showToast: !showToast}));
  };
}