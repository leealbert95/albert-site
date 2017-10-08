import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Test.css';

class Test extends Component {
  render() {
    return (
      <div style={{ height: "630px", paddingTop: "70px", width: "100%" }}>
    		<iframe style={{ height: "98.96%", width: "50%", marginLeft: "25%", marginRight: "25%" }} 
          src="https://onedrive.live.com/embed?cid=B7E2D350371D7F93&resid=B7E2D350371D7F93%212878&authkey=AKco6C1PokyXLYc&em=2" 
          scrolling="no"
          frameborder="0"
        />
      </div>
    );
  }
}

export default Test;
