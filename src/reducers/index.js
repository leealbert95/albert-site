const reduxApp = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_COORDINATES':
      console.log('Updating');
      return {
        ...state,
        coordinates: action.coordinates
      }
    case 'RESET_COORDINATES':
      console.log('Resetting');
      return {
        ...state,
        coordinates: null
      }
    default:
      return state
  }
}

export default reduxApp