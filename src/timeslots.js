import timeBlocks from './data/timeBlocks.json'
import boothNumbers from './data/vendors.json'

// Block is a unit of time member spends rotating the booth floor
// Slot is a unit of time a member spends at a single booth

export const generateTimeslots = (pairs) => {
  const timeslotsA = runGroup('A', pairs)
  const timeslotsB = runGroup('B', pairs)

  return {A: timeslotsA, B: timeslotsB}
}

const runGroup = (groupId, pairs) => {
  const boothCount = boothNumbers.length
  const pairCount = pairs[groupId].length

  const groupBlocks = timeBlocks.filter(block =>block.group === `${groupId}`)
  const {slotCount, slotLength } = calculateSlotAndBreakLengths(groupBlocks, boothCount, pairCount)

  let timeslots = []
  groupBlocks.map((block, blockIdx) => {
    let idx = 0
    let time = block.start

    while (time < block.end){
      if(timeslots.length === slotCount) break // Stop if the need number of slots is acheived
      const rawOffset = slotLength * idx
      const hoursOffset = Math.floor(rawOffset / 60) * 100
      const minutesOffset = rawOffset % 60
      time = block.start + hoursOffset + minutesOffset

      let type = 'rotation'
      if(rawOffset % 40 === 0 && rawOffset !== 0){
        type = 'break'
      }

      if(time < block.end){
        const date = block.date
        const slotIdx = timeslots.length
        timeslots.push({ type, date, time, slotIdx})
        idx++
      }
    }
  })
  return timeslots
}

const calculateSlotAndBreakLengths = (blocks, boothCount, pairCount) => {
  // TODO: Make this smarter, but for now just staticly set 8 min slots
  // per 2 hour block
  
  const slotLength = 8
  const notNeeded = 2 // static number of slots to drop (not needed)
  const slotCount = ((120/slotLength) * 3 ) - notNeeded

  return { slotCount, slotLength }
}
