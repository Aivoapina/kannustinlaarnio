'use client'

import { useState } from 'react';
import CodeGenerator from './CodeGenerator';
import { FreeChoice } from '../types/types';
import { calculateClosed } from '../utils/time';

type Props = {
  incentive: FreeChoice
}

export default function FreeSelector({
  incentive
}: Props) {
  const { id, incentiveValues, incentivePattern, endtime } = incentive;

  const [ selected, setSelected ] = useState<string | undefined>(undefined);
  const [ freeField, setFreeField ] = useState<string | undefined>(undefined);
  const [ invalidInput, setInvalidInput ] = useState<boolean>(false);

  const total = incentiveValues.reduce((a, b) => a + b.amount, 0);
  const closed = calculateClosed(endtime)

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
            disabled={closed}
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
      {!closed && (
        <label
          key="newChoice"
          htmlFor="newChoice"
          style={{ backgroundColor: '#737373', opacity: 0.9 }}
          className={`flex flex-row w-full h-8 rounded-xs relative mb-1 ${'newChoice' === selected && 'border-1'}`}
        > 
          <input 
            className="w-full pl-2 appearance-none invalid:border-red-600 invalid:border-2"
            id="newChoice"
            type="text"
            name={id.toString()}
            placeholder="Kirjoita tähän oma ehdotuksesi"
            pattern={incentivePattern}
            onClick={() => setSelected('newChoice')}
            onChange={(event) => { 
              setInvalidInput(event.target.validity.patternMismatch);
              setFreeField(event.target.value)}
            }
          />
          
        </label>
      )}
      {invalidInput && (<span>Virheellinen arvo</span>)}
      {selected && <CodeGenerator id={id} selectedValue={selected === 'newChoice' ? freeField : selected} invalidValue={invalidInput} />}
    </div>
  )
};
