import React from 'react';
import {
  ResourceList,
  Avatar,
  ExceptionList,
  Button
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import './CustomerListItem.css';

export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
    note,
    openOrderCount,
    openOrdersUrl,
    latestOrderUrl,
    ...rest
  } = props;

  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  const profile = (
    <div className="CustomerListItem__Profile">
      <h3 className="CustomerListItem__Title">{name}</h3>
      <div className="CustomerListItem__Location">{location}</div>
    </div>
  );

  const orders = (
    <div className="CustomerListItem__Orders">
      <div className="CustomerListItem__OrderCount">
        {orderCount} {orderCount === 1 ? 'order' : 'orders'}
      </div>
      <div className="CustomerListItem__TotalSpent">
        {totalSpent} spent
      </div>
    </div>
  );

  let exceptions = [];
  let conditionalAction = null;

  if (note) {
    exceptions.push({ icon: 'notes', title: note });
  }

  if (openOrderCount !== undefined) {
    const label = openOrderCount === 1 ? 'order' : 'orders';
    const title = `${openOrderCount} open ${label}`;
    exceptions.push({ status: 'warning', icon: 'alert', title });
    conditionalAction = (
      <Button plain url={openOrdersUrl} external>
        View open orders
      </Button>
    );
  }

  const exceptionList = exceptions.length
  ? (
    <div className="CustomerListItem__Exceptions">
      <ExceptionList items={exceptions} />

    </div>
  )
  : null;

  const conditionalActions = conditionalAction
    ? (
      <div className="CustomerListItem__ConditionalActions">
        {conditionalAction}
      </div>
    )
    : null;

  const shortcutActions = latestOrderUrl
    ? [{ content: 'View latest order', url: latestOrderUrl }]
    : null;

  return (
    <div className="CustomerListItem">
      <ResourceList.Item {...rest} media={media} shortcutActions={shortcutActions}>
        <div className="CustomerListItem__Main">
          {profile}
          {orders}
        </div>
        {exceptionList}
        {conditionalActions}
      </ResourceList.Item>
    </div>
  );
}