import React from 'react';

const BeerCard = props => {
  const { beer, tvLayoutCardHeight, device } = props;

  const margin = 5;
  const beercardStyle = {
    background: beer.color, // sets the background of the beer card into its current beer color
    marginBottom: margin, // a little separation
    height: !device.mobile ? tvLayoutCardHeight - margin: null // if device is tv, render with the provided height minus the margin stated above
  }

  const renderMobileLayout = () => {
    return (
      <div
        className="mobile"
        >
        <span className="beer-name">
          <h2>{beer.name}</h2>
        </span>

        <span className="beer-price">
          <h2>€ {beer.price}</h2>
        </span>

        <div className="beer-info">
          <p>{beer.style} · {beer.abv}% · {beer.ibu ? beer.ibu + ' · ': null} {beer.brewery} · {beer.country}</p>
        </div>

      </div>
    );
  }

  const renderTvLayout = () => {
    return (
      <div
        className="tv"
        >
        <span className="beer-name">
          <h2>{beer.name}</h2>
        </span>

        <span className="beer-info">
          <p>{beer.style} · {beer.abv}% · {beer.ibu ? beer.ibu + ' · ': null} {beer.brewery} · {beer.country}</p>
        </span>

        <span className="beer-price">
          <h2>€ {beer.price}</h2>
        </span>
      </div>
    );
  }

  return(
    <div
      className="beercard"
      style={beercardStyle}
      >
      {device.mobile ? renderMobileLayout() : renderTvLayout()}
    </div>
  );

}

export default BeerCard;