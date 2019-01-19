import React from 'react';
import TextInputField from './TextInputField';

const SearchBar = ({ onSearchSheetCheat }) => (
  <div>
    <TextInputField
      name="search-input"
      placeholder="Search Sheet Cheat"
      type="text"
      onChange={onSearchSheetCheat}
      label="Search Git Cheat Sheet"
      icon="search"
    />
  </div>
);

export default SearchBar;
