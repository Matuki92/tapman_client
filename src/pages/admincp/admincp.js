// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// components
import BeerSearch from './components/beersearch';
import BeerForm from './components/beerform';
// services
import { logout } from '../../services/authservice';
import { searchBeer, editBeer, addBeer, deleteBeer } from '../../services/beerservice'

class AdminCP extends Component {

  constructor({ onLogout, venue}) {
    super();

    this.state = {
      venue,
      searchInputValue: '',
      searchResult: [],
      errors: {
        searching: false
      }
    }

    this.onLogout = onLogout;
    this.searchInputTimeoutKey = null;
  }

  // lifecycle functions

  componentWillMount() {
    this.getCleanFormData();
  }

  //////////////////////
  // set the default values for all the inputs and search results
  // this function is also called when the user submits a beer or clears the fields
  getCleanFormData = () => {
    const formData = {
      name: '',
      style: '',
      abv: '',
      ibu: '',
      brewery: '',
      country: '',
      color: '#e7c61d',
      price: '',
      active: false
    };
    this.setState({
      formData,
      searchInputValue: ''
    });
  }

  // Beer search bar
  // set a timeout of 1 second after the user stops typing to start the search
  // sends the result to "beerresult" component
  handleHideSearchResult = () => {
    this.setState({
      searchResult: []
    });
    document.removeEventListener('click', this.handleHideSearchResult)
  }

  handleSearchInput = ({ target }) => {

    this.setState({
      searchInputValue: target.value
    });

    let errors = this.state.errors;

    if (this.searchInputTimeoutKey) {
      clearTimeout(this.searchInputTimeoutKey);
    }

    if (target.value.length > 0) {
      this.searchInputTimeoutKey = setTimeout(() => {
        console.log(`searching for "${target.value}"`);

        document.addEventListener('click', this.handleHideSearchResult);

        errors.searching = true;

        this.setState({errors});

        searchBeer(target.value)
          .then(result => {
            errors.searching = false;

            this.setState({
              searchResult: result.beers,
              errors
            });
          })
          .catch(err => console.log(err));
      }, 1000);
    } else {
      this.setState({
        searchResult: []
      });
    }
  }

  // this function is called from the "beersearch" component and receives
  // the selected beer for editing, then its sent to the "beerform" component
  // and fills the fields with its data
  handleEditBeer = (beer) => {
    console.log('editing ', beer.name);
    this.setState({
      formData: beer,
      searchInputValue: ''
    });
  }

  // sends selected beer id from "beersearch" component to the beer service
  handleDeleteBeer = (beer) => {
    deleteBeer(beer._id, beer.active)
    .then(() => {
      console.log(`${beer.name} was removed from db`);
        this.getCleanFormData()
      })
      .catch(err => console.log(err));
  }

  // Beer form
  // this function is currently only storing the value entered in the inputs
  // and rendering them for visualisation.
  // validation can be added if necessary
  handleFormInputs = e => {
    // validity
    const { name, value } = e.target;
    let newFormData = this.state.formData;

    newFormData[name] = value;

    this.setState({
      formData: newFormData
    });
  }

  // submit function
  handleSubmitForm = e => {
    e.preventDefault();
    const { formData } = this.state;
    this.formErrors = document.getElementById('form-errors');
    this.formErrors.innerHTML = null;

    // we send the form DOM element to receive an array of all the inputs submitted
    const fields = this.formatSubmittedData(e.target);

    let formIsValid = true;

    // check if the inputs are valid, one by one, and if even only one of them is invalid,
    // formIsValid is turned to false and errors will be triggered on submit
    fields.forEach(input => {
      if (!this.checkInputValidity(input)) {
        formIsValid = false;
        this.formErrors.innerHTML += `"${input.name}", `
      }
    });

    if (formIsValid) {
      this.formErrors.innerHTML = null;

      return formData._id ?
      editBeer(formData)
      .then(() => this.getCleanFormData())
      .catch(err => console.log(err))
      :
      addBeer(formData)
      .then(() => {
        console.log(`${formData.name} added to db`);
        this.getCleanFormData()
      })
      .catch(err => console.log(err));
    } else {
      // show errors
      this.formErrors.innerHTML += ' fields have errors, please check.';
    }

    console.log(formIsValid ? 'Submitted data is OK!' : 'There is an error in the form');
  }

  // Formats form HTMLDOM element into custom object
  formatSubmittedData = formFields => {

    // store every one of the submitted DOM element inputs as array items
    const submittedFields = [formFields[0],
      formFields[1],
      formFields[2],
      formFields[3],
      formFields[4],
      formFields[5],
      formFields[6],
      formFields[7],
      formFields[8]]

    let newData = []

    // format the inputs into objects with their info
    submittedFields.forEach(input => {
      let newInput = {
        name: input.name,
        validity: input.validity
      };

      // when a DOM element is submitted, all its values turn to string
      // with this switch statement i turn them back to the value they should have
      switch (input.name) {
        case 'abv' || 'price' || 'ibu': newInput.value = Number(input.value);break;
        case 'active': newInput.value = !!input.value;break;
        default: newInput.value = input.value += '';break;
      }

      newData.push(newInput);
    });

    // send the objects array for further validation
    return newData;
  }

  // Check input validity
  // returns false if the received input object matches any of the fail tests
  // and true if the tests are passed
  checkInputValidity = input => {

    const isIbuField = input.name === 'ibu';
    const isNumber = typeof input.value === 'number';
    const isString = typeof input.value === 'string';
    const isBoolean = typeof input.value === 'boolean';
    const isEmpty = !input.value > 0;

    if (isIbuField && (isNumber || input.value === '')) {return true;}

    switch (input.name) {
      case 'abv' || 'price': if (isNumber && !isEmpty) {return true;};break;
      case 'active': if (isBoolean) {return true;};break;
      default: if (isString && !isEmpty) {return true;};break;
    }

    return false;
  }

  // Logout

  handleLogout = () => {
    logout()
      .then(ok => {
        return ok ? this.onLogout() : null;
      })
      .catch(err => console.log(err))
  }

  render() {
    const { searchResult, errors, formData, searchInputValue } = this.state;

    return (
      <div className="container">
        <div className="admincp-header">
          <button><Link to="/">Back to BeerScreen</Link></button>
          <button type="button" onClick={this.handleLogout}>Logout</button>
        </div>
        <BeerSearch
          value={searchInputValue}
          onChange={this.handleSearchInput}
          editBeer={this.handleEditBeer}
          deleteBeer={this.handleDeleteBeer}
          searchResult={searchResult}
          searching={errors.searching}
        />
        <BeerForm
          formData={formData}
          onChange={this.handleFormInputs}
          onSubmit={this.handleSubmitForm}
          onClear={this.handleClearFormData}
        />
      </div>
    );
  }
}

export default AdminCP;