import React from 'react';
import {AppProvider, ContextualSaveBar, Frame} from '@shopify/polaris';

export default class App extends React.Component {
  render() {
    return (
      <div style={{height: '250px'}}>
        <AppProvider
          theme={{
            logo: {
              width: 124,
              contextualSaveBarSource:
                'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
            },
          }}
        >
          <Frame>
            <ContextualSaveBar
              message="Unsaved changes"
              saveAction={{
                onAction: () => console.log('add form submit logic'),
                loading: false,
                disabled: false,
              }}
              discardAction={{
                onAction: () => console.log('add clear form logic'),
              }}
            />
          </Frame>
        </AppProvider>
</div>
    );
  }
}