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
	}
	componentDidUpdate () {
		// Animate fade on mount/unmount
		console.log("Portal")
		const duration = 200;
		const styles = `
				.fade-enter { opacity: 0.01; }
				.fade-enter.fade-enter-active { opacity: 1; transition: opacity ${duration}ms; }
				.fade-exit { opacity: 1; }
				.fade-exit.fade-exit-active { opacity: 0.01; transition: opacity ${duration}ms; }
		`;

		render(
			<PassContext context={this.context}>
				<div>
					<style>{styles}</style>
					<TransitionGroup>
						<CSSTransition
							classNames="fade"
							timeout={duration}
							{...this.props}
						/>
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
