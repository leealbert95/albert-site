import React, { Component } from 'react';
import FbLogo from '../img/facebook-logo-png-38360.png';
import GitLogo from '../img/github-icon-38988.png';
import '../stylesheets/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Main-menu">
        <div>
          <h1>Welcome to my site!</h1>
          <div className="Social">
            <a href="https://www.facebook.com/albert.lee.9237">
             <img src={FbLogo}/> 
            </a>
          </div>
          <div className="Social">
            <a href="https://www.github.com/leealbert95">
              <img src={GitLogo}/> 
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;