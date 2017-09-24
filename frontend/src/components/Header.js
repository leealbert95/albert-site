import React, { Component } from 'react';
import GithubLogo from '../img/iconmonstr-github-1.svg';
import FbLogo from '../img/iconmonstr-facebook-1.svg';
import LinkedInLogo from '../img/iconmonstr-linkedin-1.svg';
import MainLogo from '../img/signature.svg';
import MenuIcon from '../img/iconmonstr-menu-1.svg';
import GalleryIcon from '../img/iconmonstr-picture-1.svg';
import PlacesIcon from '../img/iconmonstr-globe-5.svg';
import ProfilePicture from '../img/profile_v2.jpg';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import '../stylesheets/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: { marginLeft: "-80px" }
    }
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick() {
    var newMenuState;
    if (this.state.menuState.marginLeft == "-80px")
      newMenuState = { marginLeft: "0px" };
    else
      newMenuState = { marginLeft: "-80px" };
    this.setState({
      menuState: newMenuState
    })
  }

  render() {
    const menuClass = "dropdown " + this.state.menuState;
    return (
      <div className="Main-menu">
        <div style={{ height: 0 }}>
          <div className="dropdown" onClick = {this.onMenuClick}>
            <img id="menu-icon" src={MenuIcon}/>
            <div className="dropdown__content" style={this.state.menuState}>
              <ul>
                <li><Link to='/about' title="About"><div style={{ height: '60px' }}><img id="about" src={ProfilePicture}/></div></Link></li>
                <li><Link to='/photos' title="Gallery"><div style={{ height: '60px' }}><img id="menu-item" src={GalleryIcon}/></div></Link></li>
                <li><Link to='/places' title="Places"><div style={{ height: '60px' }}><img id="menu-item" src={PlacesIcon}/></div></Link></li>
              </ul>
            </div>
          </div>
          <h1><Link to="/"><img id="main-logo" src={MainLogo}/></Link></h1>
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