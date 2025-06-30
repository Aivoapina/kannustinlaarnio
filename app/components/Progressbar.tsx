'use client'

import { useState } from 'react';
import CodeGenerator from './CodeGenerator';

type Props = {
  id: number,
  amount: number,
  goal: number,
  closed: boolean
}

export default function Progressbar({
  id,
  amount,
  goal,
  closed
}: Props) {

  const [ selected, setSelected ] = useState(false);
  const done = amount >= goal;
  const progress = done ? 100 : (amount / goal) * 100;

  return (
    <div>
      <button 
        onClick={() => { setSelected(!selected) }}
        style={{ backgroundColor: '#737373', opacity: 0.9 }}
        className={`flex flex-row w-full h-8 rounded-xs relative justify-between ${selected && 'border-1'}` }
        disabled={closed || done}
      >
        <span className="leading-8 ml-2">{amount}€</span>
        <span className="leading-8 mr-2">{goal}€</span>
        <div className="absolute top-0 h-full -z-1" style={{ width: `${progress}%`, backgroundColor: '#2c7cb2' }} />
      </button>
      {selected && (<CodeGenerator id={id} />)}
    </div>
  )
} 