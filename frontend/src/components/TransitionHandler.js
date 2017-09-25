import React, { Component } from 'react';
import PageTransition from 'react-transition-group';

export default (props) => (
  <div style={{ backgroundColor: "rgba(255,255,255,0)", height: "660px"}}>
    {props.children}
  </div>
);

