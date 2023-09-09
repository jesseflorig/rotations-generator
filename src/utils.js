// Format time to HH:MM AM/PM
export const formatTime = (input) => {
  const hour = input.slice(0,-2)
  const min = input.slice(-2,input.length)
  const hour12 = hour % 12
  const med = hour <= 12 ? 'AM' : 'PM'
  return `${hour12}:${min} ${med}`
}

// Rotate array CCW 
export const rotateArrayLeft = (arr, offset) => {
  offset = offset % arr.length;
  return arr.slice(offset, arr.length).concat(arr.slice(0, offset));
}

// Rotate array CW
export const rotateArrayRight = (arr, offset) => {
  offset = offset % arr.length;
  return arr.slice(arr.length - offset, offset + arr.length).concat(arr.slice(0, arr.length - offset));
}
