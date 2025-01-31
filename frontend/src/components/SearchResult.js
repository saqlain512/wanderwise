// SearchResult.js
import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({ location }) => {
  return (
    <Link className="search-result">
      {location.name}
    </Link>
  );
};

export default SearchResult;
