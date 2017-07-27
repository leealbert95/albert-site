import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Test extends Component {
  render() {
    return (
      <div>
    		<h1>About</h1>
      	<Link to='/'>Home</Link>
        <p>
          Hello there! I'm Albert, recent college graduate and aspiring web developer. This is my portfolio site that I have created
          both for fun and to practice web development fundamentals. Feel free to look around as you wish! This website was made using
          React JS. 
        </p>
      </div>
    );
  }
}

export default Test;
