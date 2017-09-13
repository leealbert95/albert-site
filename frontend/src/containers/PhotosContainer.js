import { connect } from 'react-redux';
import { updateCoordinates, resetCoordinates } from '../actions';
import Photos from '../pages/Photos.js'

const mapDispatchToProps = dispatch => {
	return {
		getCoordinates: coordinates => {
			dispatch(updateCoordinates(coordinates))
		},
		resetCoordinates: () => {
			dispatch(resetCoordinates)
		}
	}
}

const PhotosContainer = connect(
	null,
	mapDispatchToProps
)(Photos);

export default PhotosContainer
