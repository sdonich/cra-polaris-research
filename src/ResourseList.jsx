// work with files from components

import React, { Component } from 'react';
import {
  Page,
  Card,
  ResourceList,
  FilterType,
  Pagination
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import CustomerListItem from './components/CustomerListItem';
import CustomerListFooter from './components/CustomerListFooter';

const customers = [
  {
    id: 341,
    url: 'customers/341',
    avatarSource: 'https://avatars.io/twitter/maejemison',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orderCount: 5,
    totalSpent: '$497.76',
    note: 'This customer is awesome! Make sure to treat them right',
    openOrderCount: 2,
    openOrdersUrl: 'orders/1456',
    latestOrderUrl: 'orders/4145'
  },
  {
    id: 256,
    url: 'customers/256',
    avatarSource: 'https://avatars.io/twitter/Astro_Ellen',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orderCount: 1,
    totalSpent: '$48.28',
    latestOrderUrl: 'orders/311'
  },
  {
    id: 145,
    url: 'customers/145',
    avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    orderCount: 2,
    totalSpent: '$73.98',
    latestOrderUrl: 'orders/245'
  },
];

const sortOptions = [
  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
  { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

const availableFilters = [
  {
    key: 'spentFilter',
    label: 'Money spent',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderCountFilter',
    label: 'Number of orders',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderDateFilter',
    label: 'Order date',
    operatorText:'is',
    type: FilterType.Select,
    options: [
      'In the last week',
      'In the last month',
      'In the last three months',
      'In the last year',
    ],
  },
  {
    key: 'emailSubscriberFilter',
    label: 'Is an email subscriber',
    type: FilterType.Select,
    options: [
      'Yes',
      'No',
    ],
  },
  {
    key: 'tagsFilter',
    label: 'Tagged with',
    type: FilterType.TextField,
  },
  {
    key: 'locationFilter',
    label: 'Located in',
    operatorText: 'country',
    type: FilterType.Select,
    options: [
      'Canada',
      'USA'
    ]
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
      searchValue: '',
      isFirstPage: true,
      isLastPage: false,
    }

    this.handleSelectionChange=this.handleSelectionChange.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
    this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
    this.handleBulkDelete = this.handleBulkDelete.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handlePreviousPage() {
    this.setState({ isFirstPage: true, isLastPage: false });
  }

  handleNextPage() {
    this.setState({ isFirstPage: false, isLastPage: true });
  }

  handleSortChange(sortValue) {
    console.log(sortValue);
    this.setState({ sortValue });
  }

  handleSelectionChange(selectedItems) {
    this.setState({selectedItems});
  }

  handleBulkEdit() {
    console.log('Opening bulk editor…');
  }

  handleBulkAddTags() {
    console.log('Asynchronously adding tags to customers…');
  }

  handleBulkRemoveTags() {
    console.log('Removing tags from customers…');
  }

  handleBulkDelete() {
    console.log('Handling bulk customer deletion…');
  }

  handleFiltersChange(appliedFilters) {
    console.log(appliedFilters);
    this.setState({ appliedFilters });
  }

  handleSearchChange(searchValue) {
    console.log(searchValue);
    this.setState({ searchValue });
  }

  render() {
    const { 
      selectedItems,
      sortValue,
      appliedFilters,
      searchValue,
      isFirstPage,
      isLastPage
    } = this.state;

    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const paginationMarkup = customers.length > 0
    ? (
      <CustomerListFooter>
        <Pagination
          hasPrevious={!isFirstPage}
          hasNext={!isLastPage}
          onPrevious={this.handlePreviousPage}
          onNext={this.handleNextPage}
        />
      </CustomerListFooter>
    )
    : null;

    return (
      <Page title="Customers">
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={customers}
            selectedItems={selectedItems}
            onSelectionChange={this.handleSelectionChange}
            renderItem={(customer) => <CustomerListItem {...customer} />}
            promotedBulkActions={[
              { content: 'Edit customers', onAction: this.handleBulkEdit }
            ]}
            bulkActions={[
              { content: 'Add tags', onAction: this.handleBulkAddTags },
              { content: 'Remove tags', onAction: this.handleBulkRemoveTags },
              { content: 'Delete customers', onAction: this.handleBulkDelete }
            ]}
            sortOptions={sortOptions}
            sortValue={sortValue}
            onSortChange={this.handleSortChange}
            filterControl={
              <ResourceList.FilterControl
                filters={availableFilters}
                appliedFilters={appliedFilters}
                onFiltersChange={this.handleFiltersChange}
                searchValue={searchValue}
                onSearchChange={this.handleSearchChange}    
              />
            }
            hasMoreItems={true}
          />
          {paginationMarkup}
        </Card>
      </Page>
    );
  }
}