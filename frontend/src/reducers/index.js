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
        coordinates: ''
      }
    default:
      return state
  }
}

export default reduxApp