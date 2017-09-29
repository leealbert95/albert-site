import React, { Component } from 'react';
import GithubLogo from '../img/iconmonstr-github-1.svg';
import FbLogo from '../img/iconmonstr-facebook-1.svg';
import LinkedInLogo from '../img/iconmonstr-linkedin-1.svg';
import MainLogo from '../img/signature.svg';
import MenuIcon from '../img/iconmonstr-menu-1.svg';
import GalleryIcon from '../img/iconmonstr-picture-1.svg';
import PlacesIcon from '../img/iconmonstr-globe-5.svg';
import ProfilePicture from '../img/profile_v2.jpg';
import BlogIcon from '../img/iconmonstr-book-18.svg';
import ResumeIcon from'../img/iconmonstr-note-38.svg';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import '../stylesheets/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: { marginLeft: "-80px" },
    }
    this.onMenuClick = this.onMenuClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);           
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onMenuClick() {
    var newMenuState;
    if (this.state.menuState.marginLeft == "-80px")
      newMenuState = { marginLeft: "0px" };
    else
      newMenuState = { marginLeft: "-80px" };
    this.setState({
      menuState: newMenuState,
    })
  }

  //close menu in event of outside click
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ 
        menuState: { marginLeft: "-80px" }
      })
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  render() {
    const activeStyle = {
      background: "linear-gradient(gray, white)"
    }
    return (
      <div className="Main-menu">
        <div style={{ height: 0 }}>
          <div className="dropdown" onClick={this.onMenuClick} ref={this.setWrapperRef}>
            <img id="menu-icon" src={MenuIcon}/>
            <nav className="dropdown__content" style={this.state.menuState}>
              <ul>
                <li style={this.props.location.pathname == '/about' ? activeStyle : {} }>
                  <Link to='/about' title="About"><div><img id="about" src={ProfilePicture}/>About</div></Link>
                </li>
                <li style={this.props.location.pathname == '/gallery' ? activeStyle : {} }>
                  <Link to='/gallery' title="Gallery"><div><img id="menu-item" src={GalleryIcon}/>Gallery</div></Link>
                </li>
                <li style={this.props.location.pathname == '/places' ? activeStyle : {} }>
                  <Link to='/places' title="Places"><div><img id="menu-item" src={PlacesIcon}/>Places</div></Link>
                </li>
                <li style={this.props.location.pathname == '/resume' ? activeStyle : {} }>
                  <Link to='/resume' title="Resume"><div><img id="menu-item" src={ResumeIcon}/>Resume</div></Link>
                </li>
              </ul>
              <div className="sidebar-filler"/>
            </nav>
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