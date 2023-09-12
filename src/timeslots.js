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
    const startMinute = time % 100
    const startHour = block.start - startMinute

    while (time < block.end){
      if(timeslots.length === slotCount) break // Stop if the need number of slots is acheived
      const rawOffset = startMinute + (slotLength * idx)
      const hoursOffset = Math.floor(rawOffset / 60) * 100
      const minutesOffset = rawOffset % 60

      time = startHour + hoursOffset + minutesOffset

      let type = 'rotation'
      const breakMod = startMinute + 48 // 40 minutes from the starting minute
      if(rawOffset % breakMod === 0 && rawOffset !== 0){
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
  
  const slotLength = 8 // in minutes
  const notNeeded = 0 // slots to drop in the event there are extra blocks (JANKY!)
  const slotCount = ((120/slotLength) * 3 ) - notNeeded

  return { slotCount, slotLength }
}
