export const updateCoordinates = coordinates => {
  return {
    type: 'UPDATE_COORDINATES',
    coordinates
  }
}

export const resetCoordinates = () => {
  return {
    type: 'RESET_COORDINATES'
  }
}