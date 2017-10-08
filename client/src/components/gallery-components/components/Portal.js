import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { render } from 'react-dom';
import PassContext from './PassContext';


export default class Portal extends Component {
	constructor () {
		super();
		this.portalElement = null;
	}
	componentDidMount () {
		const p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
		console.log('Portal Mount')
	}
	componentDidUpdate () {
		// Animate fade on mount/unmount
		console.log("Portal");

		const styles = `
				.fade-enter { opacity: 0.01; }
				.fade-enter.fade-enter-active { opacity: 1; transition: opacity 200ms; }
				.fade-exit { opacity: 1; ; transition: opacity 200ms; }
				.fade-exit.fade-exit-active { opacity: 0.01; transition: opacity 200ms; }
		`;
	
		render(
			<PassContext context={this.context}>
				<div style={{ position: "fixed", top: 0, left: 0, height: "100%", zIndex: 1 }}>
					<style>{styles}</style>
					<TransitionGroup>
						<CSSTransition key={this.props.isOpen} classNames="fade" timeout={200} {...this.props}/>
					</TransitionGroup>
				</div>
			</PassContext>,
			this.portalElement
		);
	}
	componentWillUnmount () {
		document.body.removeChild(this.portalElement);
	}
	render () {
		return null;
	}
}

Portal.contextTypes = {
	theme: PropTypes.object.isRequired,
};
