import React, { Component } from 'react';
import GithubLogo from '../img/github-logo.svg';
import FbLogo from '../img/facebook-logo.svg'
import LinkedInLogo from '../img/linkedin-logo.svg'
import { Link } from 'react-router-dom';
import '../stylesheets/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Main-menu">
        <div>
          <h1><Link to="/">Welcome to my site!</Link></h1>
          <div className="Social">
            <a href="https://www.linkedin.com/in/albert-lee-96a00911b/" title="LinkedIn">
              <img src={LinkedInLogo}/>
            </a>
          </div>
          <div className="Social">
            <a href="https://www.facebook.com/albert.lee.9237" title="Facebook">
             <img src={FbLogo}/> 
            </a>
          </div>
          <div className="Social">
            <a href="https://www.github.com/leealbert95" title="Github">
              <img src={GithubLogo}/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;