import React from 'react';
import {Autocomplete, Stack, Tag, TextContainer} from '@shopify/polaris';

export default class MultiAutocompleteExample extends React.Component {
  options = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
    {value: 'devide_string', label: 'Devide String'}

  ];

  state = {
    selected: [],
    inputText: '',
    options: this.options,
  };

  render() {
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label="Tags"
        value={this.state.inputText}
        placeholder="Vintage, cotton, summer"
      />
    );
    return (
      <div style={{height: '325px', width: '500px', margin: '30px auto'}}>
        <TextContainer>
          <Stack>{this.renderTags()}</Stack>
        </TextContainer>
        <br />
        <Autocomplete
          allowMultiple
          options={this.state.options}
          selected={this.state.selected}
          textField={textField}
          onSelect={this.updateSelection}
          listTitle="Suggested Tags"
        />
      </div>
    );
  }

  updateText = (newValue) => {
    this.setState({inputText: newValue});
    this.filterAndUpdateOptions(newValue);
  };

  removeTag = (tag) => {
    const {selected: newSelected} = this.state;
    newSelected.splice(newSelected.indexOf(tag), 1);
    this.setState({selected: newSelected});
  };

  renderTags = () => {
    return this.state.selected.map((option) => {
      let tagLabel = '';
      // console.log(option);
      
      tagLabel = option.replace('_', ' ');
      console.log(tagLabel);
      tagLabel = titleCase(tagLabel);
      return (
        <Tag key={'option' + option} onRemove={() => this.removeTag(option)}>
          {tagLabel}
        </Tag>
      );
    });
  };

  filterAndUpdateOptions = (inputString) => {
    if (inputString === '') {
      this.setState({
        options: this.options,
      });
      return;
    }

    const filterRegex = new RegExp(inputString, 'i');
    const resultOptions = this.options.filter((option) =>
      option.label.match(filterRegex),
    );
    let endIndex = resultOptions.length - 1;
    if (resultOptions.length === 0) {
      endIndex = 0;
    }
    this.setState({
      options: resultOptions,
    });
  };

  updateSelection = (selected) => this.setState({selected});
}

function titleCase(string) {
  string = string
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    });
  return string.join(' ');
}
