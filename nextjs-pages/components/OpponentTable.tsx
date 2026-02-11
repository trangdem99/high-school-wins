import { useState } from 'react';
import type { Opponent } from '@/lib/data';

interface OpponentTableProps {
  opponents: Opponent[];
}

type SortKey = keyof Opponent;
type SortDir = 'asc' | 'desc';

export default function OpponentTable({ opponents }: OpponentTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...opponents].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const thClass = (key: SortKey) =>
    `sortable ${sortKey === key ? (sortDir === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`;

  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th className={thClass('name')} onClick={() => handleSort('name')}>Opponent</th>
            <th className={thClass('games')} onClick={() => handleSort('games')}>Games</th>
            <th className={thClass('wins')} onClick={() => handleSort('wins')}>W</th>
            <th className={thClass('losses')} onClick={() => handleSort('losses')}>L</th>
            <th className={thClass('ties')} onClick={() => handleSort('ties')}>T</th>
            <th className={thClass('winPct')} onClick={() => handleSort('winPct')}>Win %</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((opp) => (
            <tr key={opp.name}>
              <td>{opp.name}</td>
              <td>{opp.games}</td>
              <td>{opp.wins}</td>
              <td>{opp.losses}</td>
              <td>{opp.ties}</td>
              <td>{opp.winPct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
