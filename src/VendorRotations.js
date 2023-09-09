import booths from './data/boothNumbers.json'
import { generateTimeslots } from './timeslots'
import { generatePairs } from './pairs'
import { rotateArrayRight } from './utils'

import Page from './Page'
import VendorRotationCard from './VendorRotationCard'


const padPairs = pairs => {
  const rotationSlots = 37 // Don't include breaks
  const paddedA = [...pairs['A'], ...genPad(pairs['A'].length, rotationSlots)]
  const paddedB = [...pairs['B'], ...genPad(pairs['B'].length, rotationSlots)]
  return {'A': paddedA, 'B': paddedB}
}

// Change the pair sorting to allow iterating for vendor booths
const reversePairs = pairs => {
  const revA = [...pairs['A'].reverse()]
  const revB = [...pairs['B'].reverse()]

  const rotA = rotateArrayRight(revA, 1)
  const rotB = rotateArrayRight(revB, 1)
  return {'A': rotA, 'B': rotB}
}

const rotatePairs = (pairs, offset) => {
  const rotA = rotateArrayRight(pairs['A'], offset)
  const rotB = rotateArrayRight(pairs['B'], offset)
  return {'A': rotA, 'B': rotB}
}

const flattenPairs = pairs => {
  const pairsA = pairs['A']
  const pairsB = pairs['B']
  return [
    ...pairsA.slice(0,13),
    ...pairsB.slice(0,13),
    ...pairsA.slice(13,26),
    ...pairsB.slice(13,26),
    ...pairsB.slice(26,38),
    ...pairsA.slice(26,38),
  ]
}

const genPad = (current, target) => {
  let pad = []
  for (let idx = current; idx < target; idx++){
    pad.push([undefined, undefined])
  }
  return pad
}

// Flatten Timeslots for Vendors
const flattenTimeslots = timeslots => {
  const blendedTimeslots = [
    ...timeslots['A'].slice(0,15),
    ...timeslots['B'].slice(0,15),
    ...timeslots['A'].slice(15,30),
    ...timeslots['B'].slice(15,30),
    ...timeslots['B'].slice(30,43),
    ...timeslots['A'].slice(30,43)
  ]
  // Rewrite slot indecies
  return blendedTimeslots.map((slot, idx) => {
    const newSlot = slot
    slot.slotIdx = idx
    return newSlot
  })
}

// Lastly add break padding
const addPairBreaks = (pairs, timeslots) => {
  let newPairs = []
  let idx = 0
  timeslots.map(slot => {
    const isRotation = slot.type ==="rotation"
    if (isRotation) {
      newPairs.push(pairs[idx])
      idx++
    } else {
      newPairs.push([undefined, undefined])
    }
  })
  return newPairs
}

export default function VendorRoations() {
  const pairs = generatePairs()
  const timeslots = generateTimeslots(pairs)

  const paddedPairs = padPairs(pairs)
  const vendorRotationPairs = reversePairs(paddedPairs)

  return (
    <>
    {booths.map((booth, idx) => {
      const rotatedPairs = rotatePairs(vendorRotationPairs, idx)
      const flatPairs = flattenPairs(rotatedPairs)
      const flatTimeslots = flattenTimeslots(timeslots)
      const pairsWithBreaks = addPairBreaks(flatPairs, flatTimeslots)

      return (
        <Page key={booth.id}>
          <VendorRotationCard booth={booth} pairs={pairsWithBreaks} timeslots={flatTimeslots}/>
        </Page>
      )
    })}
    </>
  );
}

