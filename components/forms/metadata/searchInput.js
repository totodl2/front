import React from 'react';
import { ReactComponent as Search } from 'feather-icons/dist/icons/search.svg';
import Input from '../fields/Input';

const SearchInput = props => (
  <div className="input-group">
    <Input {...props} />
    <div className="input-group-append">
      <button type="submit" className="btn btn-primary">
        <Search className="mr-2" />
        Search
      </button>
    </div>
  </div>
);

export default SearchInput;
