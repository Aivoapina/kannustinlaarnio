'use client'

import { useState } from 'react';
import CodeGenerator from './CodeGenerator';
import { Milestone } from '../types/types';
import { calculateClosed } from '../utils/time';

type Props = {
  incentive: Milestone
}

export default function Progressbar({
  incentive
}: Props) {
  const { id, milestone, endtime } = incentive;
  const { raised, goal } = milestone;

  const [ selected, setSelected ] = useState(false);
  const done = raised >= goal;
  const progress = done ? 100 : (raised / goal) * 100;
  const closed = calculateClosed(endtime);

  return (
    <div>
      <button 
        onClick={() => { setSelected(!selected) }}
        style={{ backgroundColor: '#737373', opacity: 0.9 }}
        className={`flex flex-row w-full h-8 rounded-xs relative justify-between ${selected && 'border-1'}` }
        disabled={closed || done}
      >
        <span className="leading-8 ml-2">{raised}€</span>
        <span className="leading-8 mr-2">{goal}€</span>
        <div className="absolute top-0 h-full -z-1" style={{ width: `${progress}%`, backgroundColor: '#2c7cb2' }} />
      </button>
      {selected && (<CodeGenerator id={id} />)}
    </div>
  )
} 