import type { SeasonRecord } from '@/lib/data';

interface SeasonTableProps {
  seasons: SeasonRecord[];
}

/**
 * FIX J: Season-by-season table - no brown/cream on date column
 */
export default function SeasonTable({ seasons }: SeasonTableProps) {
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Season</th>
            <th>Record</th>
            <th>Win %</th>
            <th>Class</th>
            <th>Conference</th>
            <th>Postseason</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((s) => (
            <tr key={s.season}>
              <td>{s.season}</td>
              <td>{s.wins}-{s.losses}{s.ties > 0 ? `-${s.ties}` : ''}</td>
              <td>{s.winPct}</td>
              <td>{s.classification}</td>
              <td>{s.conference}</td>
              <td>{s.postseason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
