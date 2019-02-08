import React from 'react';
import BeerResult from '../components/beerresult'

const BeerSearch = (props) => {

  const { value, onChange, editBeer, deleteBeer, searching } = props;

  let searchResult = props.searchResult;

  const renderResult = () => {
    return searchResult.map(beer => {
      return(
        <BeerResult
          key={beer._id}
          beer={beer}
          editBeer={editBeer}
          deleteBeer={deleteBeer}
          />
      );
    });
  }

  return (
    <div
    >
      <div className="beersearch-container">
        <input
          value={value}
          className="search-bar"
          type="search"
          placeholder="Find a beer..."
          onChange={onChange}
          />

        <div
          className="result-box"
          style={!searchResult && !searching ? {display: 'none'} : null}
          >
          {searchResult.length > 0 && !searching ? renderResult() : null}
        </div>
          {searching ? <p>Searching...</p> : null}
      </div>
    </div>
  );
}

export default BeerSearch;