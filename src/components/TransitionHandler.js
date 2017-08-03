import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../stylesheets/Transition.css';

class TransitionHandler extends Component {
  render() {

    return (
      <CSSTransition 
      	timeout={5000}  	
      	classNames="fade">
      	{this.props.children}
      </CSSTransition>
    );
  }
}

export default TransitionHandler;
   