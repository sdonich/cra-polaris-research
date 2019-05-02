import React from 'react';
import {Avatar, Card, ResourceList, TextStyle} from '@shopify/polaris';


const data = [
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
  {
    id: 111,
    url: 'customers/111',
    name: 'Richard',
    location: 'Los Angeles, USA',
  },
  {
    id: 482,
    url: 'customers/482',
    name: 'Tom',
    location: 'Los Angeles, USA',
  },
];

let sort = {
  DATE_MODIFIED_ASC() {
    return ([...data].sort((a, b) => {
      if (a.id > b.id) { 
        return 1; } 
      if (a.id < b.id) { 
        return -1; } 
      return 0; 
    }))
  },
  DATE_MODIFIED_DESC() {
    return ([...data].sort((a, b) => {
      if (a.id > b.id) { 
        return -1; } 
      if (a.id < b.id) { 
        return 1; } 
      return 0; 
    }))
  }
}


export default class ResourceListExample extends React.Component {
  state = {
    sortValue: 'DATE_MODIFIED_DESC',
    items: sort.DATE_MODIFIED_DESC()
  };

  renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };

  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

   
    const items = this.state.items;

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          sortValue={this.state.sortValue}
          sortOptions={[
            {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
            {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
          ]}
          onSortChange={(selected) => {
            this.setState({sortValue: selected, items: sort[selected]()});
          }}
        />
      </Card>
    );
  }
}
