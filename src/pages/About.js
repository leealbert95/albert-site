import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import '../stylesheets/About.css';

class About extends Component {
  render() {
    return (
      <div className = "about-container">
    		<h1>About</h1>
      	<Link to='/'>Home</Link>
        <p>
          Hello there! I'm Albert, recent college graduate and aspiring web developer. This is my portfolio site that I have created
          both for fun and to practice web development fundamentals. Feel free to look around as you wish! This website was made using
          React JS. 
        </p>
        <p>
          Hello there! I'm Albert, recent college graduate and aspiring web developer. This is my portfolio site that I have created
          both for fun and to practice web development fundamentals. Feel free to look around as you wish! This website was made using
          React JS. 
        </p>
        <p>
          Hello there! I'm Albert, recent college graduate and aspiring web developer. This is my portfolio site that I have created
          both for fun and to practice web development fundamentals. Feel free to look around as you wish! This website was made using
          React JS. 
        </p>
        <p>
          Hello there! I'm Albert, recent college graduate and aspiring web developer. This is my portfolio site that I have created
          both for fun and to practice web development fundamentals. Feel free to look around as you wish! This website was made using
          React JS. 
        </p>
      </div>
    );
  }
}

export default About;
