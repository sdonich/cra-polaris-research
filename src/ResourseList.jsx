import React, { Component } from 'react';
import {
  Page,
  Card,
  ResourceList,
  TextStyle,
  Avatar,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import CustomerListItem from './components/CustomerListItem';

const customers = [
  {
    id: 341,
    url: 'customers/341',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: 256,
    url: 'customers/256',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
];

export default class App extends Component {
  render() {

    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    return (
      <Page title="Customers">
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={customers}
            renderItem={(customer) => <CustomerListItem {...customer} />}
          />
        </Card>
      </Page>
    );
  }
}