// react
import React, { Component } from 'react';
// components
import BeerCard from './components/beercard';
import Footer from './components/footer';

class BeerScreen extends Component {

  constructor({ beers, settings }) {
    super();

    this.state = {
      beers,
      settings
    }

    this.errors = {
      emptyBeerList: !beers.length > 0,
      noLogo: !settings.logoUrl
    };
  }

  // LIFECYCLE FUNCTIONS

  componentWillMount() {
    this.getDevice();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      beers: nextProps.beers,
      settings: nextProps.settings
    });
  }

  shouldComponentUpdate(nextProps, nextState) {

    console.log(this.state !== nextState ? 'content updated' : 'content NOT updated');

    return this.state !== nextState;
  }
  /////////////////////

  // RENDER BEER CARDS

  renderBeerCards = () => {
    const { beers, settings, device } = this.state;

    return beers.map(beer => {
      // we need to calculate the height our cards are going to have in order to fit the screen
      const tvLayoutCardHeight = (window.innerHeight - 80 - // footer height is 80px
        (this.errors.noLogo ? 0 : settings.logoHeight)) / // minus logo height, or 0 if no logo is found
        beers.length; // divided by the number of beers on tap

        // then we can render each card with the provided exact height calculated above
      return (
        <BeerCard
          key={beer._id}
          beer={beer}
          tvLayoutCardHeight={tvLayoutCardHeight}
          device={device}
        />
      );
   });
  }

  // GET DEVICE TYPE

  getDevice = () => {
    const device = {};
    const w = window.innerWidth;

    device.mobile = 'ontouchstart' in document.documentElement

    if (w <= 768) {
      device.size = 'small'
    } else if (w > 768 && w <= 1024) {
      device.size = 'medium'
    } else if (w > 1024) {
      device.size = 'large'
    }
    console.log(`device type: ${device.mobile ? 'mobile' : 'tv'}, ${device.size} size`);

    this.setState({
      device
    });
  }

  // MAIN RENDER FUNCTION

  render() {
    const { loadingBeers, emptyBeerList, noLogo } = this.errors;
    const { settings, device } = this.state;

    const logoStyle = {
      height: settings.logoHeight,
      backgroundImage: `url(${settings.logoUrl})`,
      textAlign: 'center'
    }

    return(
      <React.Fragment>
        {noLogo ? null :
        <div
          className={device.mobile ? 'sticky site-logo' : 'site-logo'}
          style={logoStyle}
          >
        </div>
        }

        <div>
          {loadingBeers ? <h2>Loading beer list...</h2> : null}
          {this.renderBeerCards()}
          {emptyBeerList ? <h2>Beer list is empty</h2> : null}
        </div>

        <Footer/>
      </React.Fragment>
    );
  }
}

export default BeerScreen;