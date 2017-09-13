import { connect } from 'react-redux';
import Places from '../pages/Places.js'

const mapStateToProps = state => {
	return {
		center: state.coordinates
	}
}

const PlacesContainer = connect(
	mapStateToProps,
	null
)(Places);

export default PlacesContainer
