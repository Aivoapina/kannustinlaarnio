'use client'

import { useState } from 'react';

type Props = {
  id: number
  selectedValue?: string
};

export default function CodeGenerator({
  id,
  selectedValue
}: Props) {
  const [ code, setCode ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    const body = JSON.stringify({ id, value: selectedValue });
    const res = await fetch('http://localhost:3000/api/incentives', { method: 'POST', body });
    const codeRes = await res.json();
    setCode(codeRes.id);
    setLoading(false);
  }

  return (
    <div className="mt-4 w-full h-12 text-center">
      {!code ?
        <button 
          className='block m-auto font-bold uppercase border-1 rounded-sm p-2'
          style={{ backgroundColor: '#2c7cb2' }}
          disabled={loading}
          onClick={generateCode}
        >
          Generoi kannustinkoodi
        </button>
      :
        <>
          <div className="inline-block m-auto p-1 text-lg" style={{ fontFamily: 'monospace', backgroundColor: '#2c7cb2' }}>{'[' +  code + ']'}</div>
          <div>Lisää tämä koodi lahjoituksen viestikenttään.</div>
        </>
      }
    </div>
  )
}
