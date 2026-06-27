'use client'

import { MouseEventHandler, useState } from 'react';

type Props = {
  id: number
  selectedValue?: string
  invalidValue?: boolean
};

export default function CodeGenerator({
  id,
  selectedValue,
  invalidValue
}: Props) {
  const [ code, setCode ] = useState(undefined);
  const [ loading, setLoading ] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    const body = JSON.stringify({ id, value: selectedValue });
    const res = await fetch(`/api/incentives`, { method: 'POST', body });
    const codeRes = await res.json();
    setCode(codeRes.id);
    navigator.clipboard.writeText(`[${codeRes.id}]`);
    setLoading(false);
  }

  const copyToClipboard: MouseEventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    navigator.clipboard.writeText(event.currentTarget.innerHTML);
  }

  return (
    <div className="mt-4 w-full text-center">
      {!code ?
        <button 
          className='block m-auto font-bold uppercase border-1 rounded-sm p-2'
          style={{ backgroundColor: '#2c7cb2' }}
          disabled={loading || invalidValue}
          onClick={generateCode}
        >
          Generoi kannustinkoodi
        </button>
      :
        <>
          <div>
            Koodi kopioitu leikepöydälle. Klikkaamalla koodia voit kopioida koodin uudestaan leikepöydälle.
          </div>
          <div 
            className="inline-block m-auto p-1 text-lg"
            style={{ fontFamily: 'monospace', backgroundColor: '#2c7cb2' }}
            onClick={copyToClipboard}
          >
              {'[' +  code + ']'}
          </div>
          <div><a className="underline" href="https://finnruns.fi/lahjoita" target="_blank">Siirry tästä lahjoittamaan</a> ja lisää tämä koodi hakasulkeineen lahjoituksen viestikenttään.</div>
        </>
      }
    </div>
  )
}
