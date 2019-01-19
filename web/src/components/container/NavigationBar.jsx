import React from 'react';
import { Link } from 'react-router-dom';
import GitLogo from '../../asset/git-logo.png';

const renderAdminNavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">
        <img src={GitLogo} width="50" height="50" alt="Logo" />
      </Link>

      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <Link to="/" className="nav-link m-2 menu-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/user" className="nav-link m-2 menu-item">
            Dash Board
          </Link>
        </li>
        <li>
          <Link to="/logout" className="nav-link m-2 menu-item">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

const renderNavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">
        <img src={GitLogo} width="50" height="50" alt="Logo" />
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <Link to="/" className="nav-link m-2 menu-item">
            Home
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default ({ adminBar }) => (adminBar ? renderAdminNavBar() : renderNavBar());
