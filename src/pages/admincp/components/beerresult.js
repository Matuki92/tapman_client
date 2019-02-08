import React from 'react'

const BeerResult = (props) => {
  const { beer, deleteBeer, editBeer } = props;

  const handleEdit = e => {
    e.stopPropagation();

    editBeer(beer);
  }

  const handleDelete = e => {
    e.stopPropagation();

    deleteBeer(beer);
  }

  return(
    <div
      style={{background: beer.color}}
      className="result-item"
      >
      <div className="beer-info-box">
        <div>
          <p>{beer.name}</p>
        </div>
        <div>
          {beer.style} · {beer.brewery}
        </div>
      </div>

      <div className="button-box">
        <button
          className="edit-button"
          onClick={handleEdit}
          >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );

}

export default BeerResult;