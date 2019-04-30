import React from 'react';
import {Autocomplete, Stack, Tag, Icon, TextContainer} from '@shopify/polaris';

export default class App extends React.Component {
  paginationInterval = 15;

  options = Array.from(Array(100)).map((_, index) => ({
    value: `rustic_${index}`,
    label: `Rustic ${index}`,
  }));

  state = {
    selected: [],
    inputText: '',
    options: this.options,
    visibleOptionIndex: this.paginationInterval,
    loading: false
  };

  render() {
    const {visibleOptionIndex, selected, options} = this.state;
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label="Tags"
        value={this.state.inputText}
        placeholder="Vintage, cotton, summer"
      />
    );

    const optionList = options.slice(0, visibleOptionIndex);
    const selectedTagMarkup =
      selected.length > 0 ? (
        <Stack spacing="extraTight">{this.renderTags()}</Stack>
      ) : <Stack spacing="extraTight"><div>Choose your tag</div></Stack>;

    const emptyState = (
      <React.Fragment>
        <Icon source="search" />
        <div style={{textAlign: 'center'}}>
          <TextContainer>Could not find any results</TextContainer>
        </div>
      </React.Fragment>
    );    

    return (
      <div style={{height: '325px', width: '500px', margin: '30px auto'}}>
        <Stack vertical>
          {selectedTagMarkup}
          <Autocomplete
            allowMultiple
            options={optionList}
            selected={this.state.selected}
            textField={textField}
            onSelect={this.updateSelection}
            listTitle="Suggested Tags"
            onLoadMoreResults={this.handleLoadMoreResults}
            emptyState={emptyState}
            loading={this.state.loading}
          />
        </Stack>
      </div>
    );
  }

  handleLoadMoreResults = () => {
    const {visibleOptionIndex} = this.state;
    const nextVisibleOptionIndex = visibleOptionIndex + this.paginationInterval;
    if (nextVisibleOptionIndex <= this.options.length - 1) {
      this.setState({visibleOptionIndex: nextVisibleOptionIndex});
    }
  };

  updateText = (newValue) => {
    this.setState({inputText: newValue});
    this.filterAndUpdateOptions(newValue);
  };

  removeTag = (tag) => () => {
    const {selected: newSelected} = this.state;
    newSelected.splice(newSelected.indexOf(tag), 1);
    this.setState({selected: newSelected});
  };

  renderTags = () => {
    return this.state.selected.map((option) => {
      let tagLabel = '';

      tagLabel = option.replace('_', ' ');
      tagLabel = titleCase(tagLabel);
      return (
        <Tag key={`option${option}`} onRemove={this.removeTag(option)}>
          {tagLabel}
        </Tag>
      );
    });
  };

  filterAndUpdateOptions = (inputString) => {
    if (!this.state.loading) {
      this.setState({loading: true});
    }

    setTimeout(() => {
      if (inputString === '') {
        this.setState({options: this.options, loading: false});
  
        return;
      }
  
      const filterRegex = new RegExp(inputString, 'i');
      const resultOptions = this.options.filter((option) =>
        option.label.match(filterRegex),
      );
  
      this.updateOptions(resultOptions);
    }, 300)
  };

  updateOptions = (options) => {
    this.setState({options, loading: false});
  };

  updateSelection = (selected) => {
    this.setState({selected})
  };
}

function titleCase(string) {
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}
