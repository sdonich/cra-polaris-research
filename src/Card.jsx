import React from 'react';
import {ActionList, Button, Card, List, Popover, ResourceList, Stack, TextContainer} from '@shopify/polaris';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        secondaryFooterAction={{content: 'Dismiss'}}
        primaryFooterAction={{content: 'Export Report', onAction: () => {console.log('hello')}}}
      >
        <Card.Header
          actions={[
            {
              content: 'Total Sales', onAction: () => {console.log('Its total Sales')}
            },
          ]}
          title="Sales"
        >
          <Popover
            active={false}
            activator={
              <Button disclosure plain>
                View Sales
              </Button>
            }
            onClose={() => {}}
          >
            <ActionList items={[{content: 'Gross Sales'}, {content: 'Net Sales'}]} />
          </Popover>
        </Card.Header>
        <Card.Section>
          <TextContainer>
            You can use sales reports to see information about your customers' orders
            based on criteria such as sales over time, by channel, or by staff.
          </TextContainer>
        </Card.Section>
        <Card.Section title="Total Sales Breakdown">
          <ResourceList
            resourceName={{singular: 'sale', plural: 'sales'}}
            items={[
              {
                sales: 'Orders',
                amount: 'USD$0.00',
                url: 'reports/orders',
              },
              {
                sales: 'Returns',
                amount: '-USD$250.00',
                url: 'reports/returns',
              },
            ]}
            renderItem={(item) => {
              const {sales, amount, url} = item;
              return (
                <ResourceList.Item
                  url={url}
                  accessibilityLabel={`View Sales for ${sales}`}
                >
                  <Stack>
                    <Stack.Item fill>{sales}</Stack.Item>
                    <Stack.Item>{amount}</Stack.Item>
                  </Stack>
                </ResourceList.Item>
              );
            }}
          />
        </Card.Section>
        <Card.Section title="Deactivated reports" subdued>
          <List>
            <List.Item>Payouts</List.Item>
            <List.Item>Total Sales By Channel</List.Item>
          </List>
        </Card.Section>
        <Card.Section title="Note">
          <TextContainer>
            The sales reports are available only if your store is on the Shopify plan
            or higher.
          </TextContainer>
        </Card.Section>
      </Card>
    );
  }
}