import React from 'react';

const SearchBar = ({searchTerm, handleSearch}) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
    </form>
  );
};

export default SearchBar;
