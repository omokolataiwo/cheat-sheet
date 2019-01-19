import React from 'react';
import TextInputField from './TextInputField';

const SearchBar = ({ onSearchSheetCheat }) => (
  <div>
    <TextInputField
      name="firstName"
      placeholder="Search Sheet Cheat"
      type="text"
      size="3"
      onChange={onSearchSheetCheat}
    />
  </div>
);

export default SearchBar;
