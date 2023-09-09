import booths from './data/vendors.json'
import { rotateArrayLeft } from './utils'

// Create an array from start to end
const initRotation = (start, end, step=1) => {
  let arr = []
  for(let idx = start; idx <= end; idx += step){
    arr.push(idx)
  }
  return arr
}

const buildRotation = (idxList) => {
  let rotation = []
  idxList.map(idx => {
    const boothByIdx = booths.filter(booth => booth.rotationOrder === `${idx}`)[0]
    rotation.push(boothByIdx)
  })
  return rotation
}

export const boothRotation = (offset, timeslots) => {
  const rotation = initRotation(1,booths.length)
  const offsetRotation = rotateArrayLeft(rotation, offset)
  const orderedBooths =  buildRotation(offsetRotation)

  //Inject breaks into rotation
  const rotationSlots = timeslots.map(slot => slot.type==="rotation")
  let paddedBooths = []
  let boothCount = 0
  for (let idx = 0; idx < rotationSlots.length; idx++){
    if(rotationSlots[idx]) {
      paddedBooths.push(orderedBooths[boothCount])
      boothCount+=1
    } else {
      paddedBooths.push(undefined)
    }
  }
  return paddedBooths
}
