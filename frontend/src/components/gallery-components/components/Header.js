import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { withRouter } from 'react-router-dom';
import defaults from '../theme';
import { deepMerge } from '../utils';
import Icon from './Icon';
import LocationMarker from './facebook-placeholder-for-locate-places-on-maps.svg';

function Header ({
	date,
	location,
	separator,
	customControls,
	onClose,
	onButtonClick,	
	showCloseButton,
	closeButtonTitle,
	...props,
}, {
	theme,
}) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<div className={css(classes.header)} {...props}>
			<div>
				<button
					title="Go to location"
					className={css(classes.locMark)}
					onClick={onButtonClick}
				>
					<img style={{height: "100%", width: "100%"}} src={LocationMarker}/>
				</button>
				<div className={css(classes.text)}>
					{location ? location : <div/>}
					{location && date ? separator : <div/>}
					{date ? date : <div/>}
				</div>	
			</div>
			{customControls ? customControls : <span />}
			{!!showCloseButton && (
				<button
					title={closeButtonTitle}
					className={css(classes.close)}
					onClick={onClose}
				>
					<Icon fill={!!theme.close && theme.close.fill || defaults.close.fill} type="close" />
				</button>
			)}
		</div>
	);
}

Header.propTypes = {
	date: PropTypes.string,
	location: PropTypes.string,
	separator: PropTypes.string,
	customControls: PropTypes.array,
	onClose: PropTypes.func.isRequired,
	showCloseButton: PropTypes.bool,
};
Header.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		height: defaults.header.height,
		color: defaults.footer.color,
	},
	text: {
		display: 'inline-block',
		verticalAlign: 'middle',
		paddingTop: 10
	},
	close: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		position: 'relative',
		top: 0,
		verticalAlign: 'bottom',

		// increase hit area
		height: 40,
		marginRight: -10,
		padding: 10,
		width: 40,
	},
	locMark: {
		height: 30,
		width: 30,
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		position: 'relative',
		top: 0,
		verticalAlign: 'bottom',
		paddingTop: 10
	}
};

export default Header;
