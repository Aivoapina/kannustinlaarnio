export const dynamic = 'force-dynamic'

import { Incentive, isFixedChoice, isFreeChoice, isMilestone } from "./types/types";
import Progressbar from "./components/Progressbar";
import FixedSelector from "./components/FixedSelector";
import React from "react";
import FreeSelector from "./components/FreeSelector";
import { calculateClosed } from "./utils/time";

const calculateIncentiveStatus = (inc: Incentive) => {
  // const now = new Date(2026, 6, 3, 15, 0, 0).getTime();
  const now = new Date().getTime();
  const end = new Date(inc.endtime).getTime();

  const diffInMs = end - now;
  const diff = diffInMs / 1000 / 60;
  const closed = isMilestone(inc) && inc.milestone?.goal < inc.milestone?.raised

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

const renderIncentive = (inc: Incentive) => (
  <div className="mb-5 pb-5 border-b" key={inc.id}>
    <h3 className="text-3xl mb-2">{inc.game}: {inc.title}</h3>
    <p className="mb-4 [&>a]:text-blue-700" dangerouslySetInnerHTML={{ __html: inc.info }}></p>

    <p className="mb-4" style={{ color: '#00a5ff' }} >{calculateIncentiveStatus(inc)}</p>

    {isFixedChoice(inc) && <FixedSelector incentive={inc} />}
    {isFreeChoice(inc) && <FreeSelector incentive={inc} />}
    {isMilestone(inc) && <Progressbar incentive={inc} />}
  </div>
);

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/incentives', { method: 'GET' });
  const incentives: Incentive[] = await data.json();

  const openIncs = incentives.filter(inc => !calculateClosed(inc.endtime))
  const closedIncs = incentives.filter(inc => calculateClosed(inc.endtime))

  return (
    <div>
      {openIncs.map((inc) => renderIncentive(inc))}
      <h2 className="text-4xl mb-5">Kiinni menneet kannusteet</h2>
      {closedIncs.map((inc) => renderIncentive(inc))}
    </div>
  );
}
