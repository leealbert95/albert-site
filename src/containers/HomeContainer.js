import { connect } from 'react-redux';
import { resetCoordinates } from '../actions';
import Home from '../pages/Home.js'

const mapDispatchToProps = dispatch => {
	return {
		resetCoordinates: () => {
			dispatch(resetCoordinates)
		}
	}
}

const HomeContainer = connect(
	null,
	mapDispatchToProps
)(Home);

export default HomeContainer