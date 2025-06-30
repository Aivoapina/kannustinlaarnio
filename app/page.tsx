export const dynamic = 'force-dynamic'

import { IncentivesResponse } from "./types/types";
import Progressbar from "./components/Progressbar";
import FixedSelector from "./components/FixedSelector";
import React from "react";

const calculateIncentiveStatus = (inc: IncentivesResponse) => {
  // const now = new Date(2025, 6, 3, 15, 0, 0).getTime();
  const now = new Date().getTime();
  const end = new Date(inc.endtime).getTime();

  const diffInMs = end - now;
  const diff = diffInMs / 1000 / 60;
  const closed = inc.milestone && inc.milestone?.goal < inc.milestone?.raised

  if (closed) {
    return 'Kannustin on täynnä.';
  } else if (diff < 0) {
    return 'Kannustin on kiinni.';
  } else if ( diff <= 60) {
    return 'Alle tunti jäljellä';
  } else if ( 60 < diff && diff <= 60 * 24 ) {
    const hours = Math.floor(diff / 60);
    return `${hours} ${hours === 1 ? 'tunti' : 'tuntia'} jäljellä.`;
  } else {
    const days = Math.floor(diff / 60 / 24);
    return `${days} ${days === 1 ? 'päivä' : 'päivää'} jäljellä.`
  }
}

const calculateClosed = (endtime: string) => {
  const now = new Date().getTime();
  const end = new Date(endtime).getTime();
  const diff = end - now;
  return diff < 0;
}

export default async function Home() {
  const data = await fetch('https://lahjoita.finnruns.fi/api/incentives', { method: 'GET' });
  const incentives: IncentivesResponse[] = await data.json();

  return (
    <div>
      {incentives.map((inc) => (
        <div className="mb-5 pb-5 border-b" key={inc.id}>
          <h3 className="text-3xl mb-2">{inc.game}: {inc.title}</h3>
          <p className="mb-4">{inc.info}</p>

          <p className="mb-4">{calculateIncentiveStatus(inc)}</p>

          {inc.incentiveType === 'fixedChoice' && inc.incentiveValues && (
            <FixedSelector id={inc.id} incentiveValues={inc.incentiveValues} />
          )}
          {inc.incentiveType === 'milestone' && inc.milestone && (
            <Progressbar id={inc.id} amount={inc.milestone.raised} goal={inc.milestone.goal} closed={calculateClosed(inc.endtime)} />
          )}
        </div>
      ))}
    </div>
  );
}
