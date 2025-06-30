'use client'

import { useState } from 'react';
import CodeGenerator from './CodeGenerator';
import { IncentiveValues } from '../types/types';

type Props = {
  id: number,
  incentiveValues: IncentiveValues[]
}

export default function FixedSelector({
  id,
  incentiveValues,
}: Props) {

  const [ selected, setSelected ] = useState<string | undefined>(undefined);

  const total = incentiveValues.reduce((a, b) => a + b.amount, 0);

  return (
    <div>
      {incentiveValues.map(inc => (
        <label
          key={inc.name}
          htmlFor={inc.name}
          style={{ backgroundColor: '#737373', opacity: 0.9 }}
          className={`flex flex-row w-full h-8 rounded-xs relative mb-1 ${inc.name === selected && 'border-1'}`}
        > 
          <input 
            className="mr-2 appearance-none"
            id={inc.name}
            type="radio"
            value={inc.name}
            name={id.toString()}
            onChange={(event) => { setSelected(event.target.value); }}
          />
          <span className="mr-1 leading-8">
            {inc.name}
          </span>
          <span className="leading-8 ml-2">{inc.amount}€</span>
          <div className="absolute top-0 h-full -z-1" style={{ width: `${(inc.amount / total) * 100}%`, backgroundColor: '#2c7cb2' }} />
        </label>
      ))}

      {selected && <CodeGenerator id={id} selectedValue={selected} />}
    </div>
  )
};
