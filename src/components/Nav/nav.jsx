import React from 'react';
import { Icon } from 'react-fa';

/**
* Basic CTData Navbar object
*
* @return {object} Returns footer markup
*/
function Nav() {
  return (
    <header className="ctdo-header">
      <span className="ctda-header-title">Exploring School Capacity and Enrollment</span>
      <ul className="ctdm-header-list">
        <li className="ctda-header-list-item">
          <a className="ctda-link ctda-link__inverse" href="http://ctdata.org">
            <span className="ctdm-ctdata-logo">
              <div className="ctda-logo-circle dark-blue" />
              <div className="ctda-logo-circle medium-blue" />
              <div className="ctda-logo-circle light-blue" />
              <div className="ctda-logo-circle extra-light-blue" />
            </span>
          </a>
        </li>
        <li className="ctda-header-list-item">
          <a className="ctda-link ctda-link__inverse" href="https://twitter.com/ctopendata">
            <Icon name="twitter" size="lg" />
          </a>
        </li>
        <li className="ctda-header-list-item">
          <a className="ctda-link ctda-link__inverse" href="https://www.facebook.com/pages/CT-Data-Collaborative/150954425018093">
            <Icon name="facebook" size="lg" />
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
