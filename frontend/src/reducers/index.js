const reduxApp = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_COORDINATES':
      return {
        ...state,
        coordinates: action.coordinates
      }
    case 'RESET_CONTAINER':
      return {
        ...state,
        coordinates: ''
      }
    default:
      return state
  }
}

export default reduxApp