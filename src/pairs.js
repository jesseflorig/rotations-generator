import members from './data/members.json'
import pairs from './data/pairs.json'

export const generatePairs = () => {
  const pairsA = generatePairsByGroup('A')
  const pairsB = generatePairsByGroup('B')

  return {A: pairsA, B: pairsB}
}

// Generate complete pairs for a rotation group
const generatePairsByGroup = (groupId) => {
  const forcedPairs = pairs
    .filter(pair => pair.firstPairRotationGroup === `Group ${groupId}`)
    .map(({firstPairId, secondPairId}) => {
      const secondId = secondPairId === null ? undefined : secondPairId
      return [firstPairId, secondId ]
    })
  const usedIds = forcedPairs.flat()

  const peerGroups = generatePeerGroups(groupId, usedIds)
  const pairedPeers = pairPeerGroups(peerGroups)

  return [...forcedPairs, ...pairedPeers]
}

// Return pairs from peer groups
const pairPeerGroups = (peerGroups) => {
  return Object.keys(peerGroups).map(id => {
    const currentPairs = pairGroup(peerGroups[id])
    return currentPairs
  }).flat()
}

// Pair up a single group, leftover singletons will be "paired" alone
const pairGroup = (group) => {
  const max = !(group.length) % 2 ? group.length : group.length + 1

  // If random pairings is desired, shuffle group here

  let pairs = []
  for(let idx=0; idx + 1 < max; idx +=2){
    const first = group[idx]
    const second = idx + 1 > max ? null : group[idx + 1]
   pairs.push([first, second]) 
  }
  return pairs
}

// Generate peer groups for a given rotation group excluding forced paired members
const generatePeerGroups = (rotationGroup, ignoreIds) => {
  const DEV = false
  const devLog = (msg, type='log') => DEV && console[type](msg)
  const peerGroups = {}

  for(let idx=1; idx < 11; idx++){
    // Only add peer group if it contains members
    const currentPeerGroup = getPeerGroup(rotationGroup, `${idx}`, ignoreIds)
    if(currentPeerGroup.length > 0){
      peerGroups[idx] = currentPeerGroup
    }
  }
  devLog(rotationGroup)
  devLog(peerGroups)
  return peerGroups
}

// Filter peer group
const getPeerGroup = (rotationGroup, peerId, ignoreIds) => {
  return members
    .filter(member => 
      !ignoreIds.includes(member.id) &&
      member.rotationGroup === `Group ${rotationGroup}` &&
      member.peerGroup === peerId
    )
    .map(member => member.id)
}
