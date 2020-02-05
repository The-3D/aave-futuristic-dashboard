import moment from 'moment';
import { useEffect, useState } from 'react';

function getCurrentTimestamp(): number {
  return Number(moment().format('X'));
}

export function useCurrentTimestamp(updateInterval: number = 15): number {
  const [timestamp, setTimestamp] = useState(getCurrentTimestamp());

  useEffect(() => {
    const intervalHandlerID = setInterval(
      () => setTimestamp(getCurrentTimestamp()),
      1000 * updateInterval
    );
    return () => clearInterval(intervalHandlerID);
  }, []);

  return timestamp;
}
