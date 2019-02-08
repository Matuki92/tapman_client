import React from 'react';
import { Link } from 'react-router-dom';
import { appLogo } from '../../../appdata/url';

const Footer = () => {
  return (
    <React.Fragment>
      <footer id="footer">
        <div className="footer-logo">
          <Link to='/admin'>
            <img
              src={appLogo}
              alt="app logo"
              ></img>
          </Link>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;