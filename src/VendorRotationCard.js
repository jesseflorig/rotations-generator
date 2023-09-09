import React from 'react'

import './VendorRotationCard.css'
import members from './data/members.json'
import bkbgLogo from './img/bkbgLogo.png'
import { formatTime } from './utils'

// Time | Companty A | Company B

const getMemberNameById = (id) => {
  if(!id) return ""
  const member = members.filter(member => member.id === id)[0]
  return `${member.name}`
}

const TableBodyRow = ({idx, slot, pair}) => {
  const formattedTime = formatTime(`${slot.time}`)
  const noPair = !pair[0] && !pair[1]
  const memberA = getMemberNameById(pair[0])
  const memberB = getMemberNameById(pair[1])
  const isEven = idx % 2 === 0;
  return (
    <tr className={ isEven ? "row" : "alt-row"}>
      <td className="tdTime">{ formattedTime }</td>
      { slot.type === "rotation" && !noPair && (
        <>
          <td className="tdCompany">{memberA}</td>
          <td className="tdCompany">{memberB}</td>
        </>
      )}
      { (slot.type !== "rotation" || noPair) && (
        <td className="tdBreak" colSpan={2}>BREAK</td>
      )}
    </tr>
  )
}

const DayTable = ({ day, timeslots, pairs, booth }) => {
  const todaySlots = timeslots.filter(slot => slot.date === day)
  const dayLabel = day.slice(day.length - 2, day.length)
  return (
    <>
      {dayLabel === "21" && (
        <>
          <h1>{`${booth.name} | Booth #${booth.boothNumber}`}</h1> 
        </>
      )}

      <table className={`vendorTable-${dayLabel}`} cellPadding={1} cellSpacing={0}>
        <thead>
          <tr>
            <th colSpan="3" className="thDate">{day}</th>
          </tr>
          <tr>
            <th className="colHead thTime">Time</th>
            <th className="colHead thCompany">Member</th>
            <th className="colHead thCompany">Member</th>
          </tr>
        </thead>
        <tbody>
          {todaySlots.map((slot, slotIdx) => (
            <TableBodyRow key={`timeslot-${slot.time}`} idx={slotIdx} slot={slot} pair={pairs[slot.slotIdx]}/> 
          ))}
        </tbody>
      </table>
    </>
  )
}

export default function VendorRotationCard({booth, timeslots, pairs}){
  const days = [...new Set(timeslots.map(slot => slot.date))]
  return (
    <div>
      <h1>{`${booth.name} | Booth #${booth.boothNumber}`}</h1>
      <img src={bkbgLogo} className="logo vendor" alt="bkbg logo" />
      <div>
        { days.map((day) => (
          <DayTable 
            key={day} 
            day={day} 
            pairs={pairs}
            timeslots={timeslots} 
            booth={booth}
          />
        ))}
      </div>
    </div>
  )
}
