import React from 'react';

const BeerForm = ({formData, onChange, onSubmit, onClear }) => {

  const light = '#e7c61d',
    blond = '#b95c1d',
    red = '#950000',
    brown = '#67371A',
    dark = '#251912';

  return (
    <div>

      <form onSubmit={onSubmit} noValidate>
        <h1>Beer editor</h1>
        <p id="form-errors"></p>
        <div className="field">
          <label id="name">Beer name <span className="required">*</span></label>
          <input onChange={onChange} name="name" value={formData.name} required placeholder=""/>
        </div>

        <div className="field">
          <label id="style">Style <span className="required">*</span></label>
          <input onChange={onChange} name="style" value={formData.style} required placeholder=""/>
        </div>

        <div className="inline-fields">
          <div className="field">
            <label id="abv">Alcohol % <span className="required">*</span></label>
            <input onChange={onChange} name="abv" value={formData.abv} required type="number" placeholder=""/>
          </div>

          <div className="field">
            <label id="ibu">IBU</label>
            <input onChange={onChange} name="ibu" value={formData.ibu || ''} type="number" placeholder=""/>
          </div>

          <div className="field">
            <label id="price">Price <span className="required">*</span></label>
            <input onChange={onChange} name="price" value={formData.price} required type="number" placeholder=""/>
          </div>
        </div>

        <div className="field">
          <label id="brewery">Brewery <span className="required">*</span></label>
          <input onChange={onChange} name="brewery" value={formData.brewery} required placeholder=""/>
        </div>

        <div className="field">
          <label id="country">Country <span className="required">*</span></label>
          <input onChange={onChange} name="country" value={formData.country} required placeholder=""/>
        </div>

        <div className="inline-fields">

          <div className="field">
            <label id="active">Status <span className="required">*</span></label>
            <select onChange={onChange} name="active" value={formData.active}>
              <option value={true}>On tap</option>
              <option value={false}>Hidden</option>
            </select>
          </div>

          <div className="field">
            <label id="color">Color <span className="required">*</span></label>
            <select onChange={onChange} name="color" value={formData.color}>
              <option value={light}>Light</option>
              <option value={blond}>Blond</option>
              <option value={red}>Red</option>
              <option value={brown}>Brown</option>
              <option value={dark}>Dark</option>
            </select>
          </div>

          <div className="field">
            <button type="submit" className="done-button">
              Done!
            </button>

            <button type="button" onClick={onClear} className="clear-button">
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BeerForm;