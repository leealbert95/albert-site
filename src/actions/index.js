export const updateCoordinates = coordinates => {
  return {
    type: 'UPDATE_COORDINATES',
    coordinates
  }
}

export const resetCoordinates = () => {
	console.log('Reset in actions');
  return {
    type: 'RESET_COORDINATES'
  }
}