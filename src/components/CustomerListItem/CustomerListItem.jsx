import React from 'react';
import {
  ResourceList,
  Avatar,
  TextStyle,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

export default function CustomerListItem(props) {
  const { id, url, name, location } = props;
  const media = <Avatar customer size="medium" name={name} />;

  return (
    <div className="CustomerListItem">
      <ResourceList.Item id={id} url={url} media={media}>
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    </div>
  );
}