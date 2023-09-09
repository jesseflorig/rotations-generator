import { generateTimeslots } from './timeslots'
import { generatePairs } from './pairs'

import Page from './Page'
import MemberRotationCard from './MemberRotationCard'

export default function MemberRotations() {
  const pairs = generatePairs()
  const timeslots = generateTimeslots(pairs)

  const groupKeys = Object.keys(pairs);

  return (
    <>
      {groupKeys.map(key => {
        const groupSlots = timeslots[key]
        return pairs[key].map((pair, pairIdx) => {
          return (
          <div key={pairIdx}>
            <Page>
              <MemberRotationCard memberId={pair[0]} timeslots={groupSlots} offset={pairIdx} />
            </Page>
            {pair[1] && (
              <Page>
                <MemberRotationCard memberId={pair[1]} timeslots={groupSlots} offset={pairIdx} />
              </Page>
            )}
          </div>
        )})
      })}
    </>
  );
}

