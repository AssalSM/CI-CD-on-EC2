import React from 'react'
import { VscDebugBreakpointData } from "react-icons/vsc";
import { TbPointFilled } from "react-icons/tb";
import "./ListOfNotes.css"

function ListOfNotes({props, notes}) {
  return (
    <div className="flex padding">
      <div className="flex gap1">
        <TbPointFilled  />
        <p className="text-on-list">{notes?.title}</p>
      </div>
      <p className="">{notes?.note}</p>
     
      <span className="text">
        Edit
      </span>
      <button  onClick={() => {
                  props(true);
                }} className="text">
        Delete
      </button>
    </div>
  )
}

export default ListOfNotes
