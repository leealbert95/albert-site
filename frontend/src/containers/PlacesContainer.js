import { connect } from 'react-redux';
import { resetCoordinates } from '../actions';
import Places from '../pages/Places.js' 

const mapStateToProps = state => {
	return {
		center: state.coordinates
	}
}

const mapDispatchToProps = dispatch => {
	return {
		resetCoordinates: () => {
			console.log('Reset called in container');
			dispatch(resetCoordinates())
		}
	}
}

const PlacesContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Places);

export default PlacesContainer
