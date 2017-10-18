import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/About.css';

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="content">
          <h1>About Me</h1>
          <p>
            Hello there! I'm Albert, recent college graduate and aspiring web developer. This is my portfolio site that I have created
            both for fun and to practice frontend and backend engineering. I will continue to add more projects to my portfolio as I 
            expand my web development knowledge. Feel free to look around as you wish! This website was made with React and uses an Express backend to fetch 
            the data for the Gallery and Places pages. 
          </p>
          <div className="bio">
            <h3>Bio</h3>
            <p>Birthday: July 10, 1995</p>
            <p>Birthplace: San Jose, CA</p>
            <p>Alma Mater: Vanderbilt University (B.S. Computer Science, May 2017)</p>
            <p>Current Residence: Irvine, CA</p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
