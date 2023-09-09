import React from 'react'

import './MemberRotationCard.css'
import members from './data/members.json'
import bkbgLogo from './img/bkbgLogo.png'
import { boothRotation } from './booths'
import { formatTime } from './utils'

// Time | Booth Company | Booth Number

const TableBodyRow = ({idx, slot, booth = {name: "", boothNumber: ""}}) => {
  const formattedTime = formatTime(`${slot.time}`)
  const isBreak = slot.type !== "rotation"
  const breakClass = isBreak ? "tdBreak" : null
  const isEven = idx % 2 === 0;
  return (
    <tr className={ isEven ? "row": "alt-row"}>
      <td className="tdTime">{ formattedTime }</td>
      <td className={`tdCompany ${breakClass}`}>{ isBreak ? 'BREAK' : booth.name }</td>
      <td className="tdBooth">{ isBreak ? '--' : booth.boothNumber }</td>
    </tr>
  )
}

const DayTable = ({ day, timeslots, offset }) => {
  const todaySlots = timeslots.filter(slot => slot.date === day)
  const booths = boothRotation(offset, timeslots)
  return (
    <table className="memberTable" cellPadding={1} cellSpacing={0}>
        <thead>
          <tr>
            <th colSpan="3" className="thDate">{day}</th>
          </tr>
          <tr>
            <th className="colHead thTime">Time</th>
            <th className="colHead thCompany">Company</th>
            <th className="colHead thBooth">Booth</th>
          </tr>
        </thead>
        <tbody>
          {todaySlots.map((slot, idx) => (
            <TableBodyRow key={`timeslot-${slot.time}`} idx={idx} slot={slot} booth={booths[slot.slotIdx]}/> 
          ))}
        </tbody>
      </table>
  )
}

export default function MemberRotationCard({memberId, timeslots, offset}){
  const memberName = members.filter(member => member.id === memberId)[0].name
  const days = [...new Set(timeslots.map(slot => slot.date))]

  return (
    <div className="cardContainer">
      <h1>{memberName}</h1>
      <img src={bkbgLogo} className="logo member" alt="bkbg logo" />
      { days.map((day) => (
        <DayTable 
          key={day} 
          day={day} 
          timeslots={timeslots} 
          offset={offset} 
        />
      ))}
    </div>
  )
}
