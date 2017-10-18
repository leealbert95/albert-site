import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/About.css';

class Projects extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="content">
          <h1>Projects</h1>
          <Link to='/projects/travel'><h3>Travel Log</h3></Link>
        </div>
      </div>
    );
  }
}

export default Projects;