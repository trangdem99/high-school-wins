import type { Game } from '@/lib/data';

interface GameLogTableProps {
  seasonLabel: string;
  seasonInfo: string;
  games: Game[];
}

export default function GameLogTable({ seasonLabel, seasonInfo, games }: GameLogTableProps) {
  return (
    <div className="season-section">
      <h3 className="section-title">{seasonLabel}</h3>
      <div className="season-record">{seasonInfo}</div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>Result</th>
              <th>Score</th>
              <th>Location</th>
              <th>Notes</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, i) => (
              <tr key={i}>
                <td>{game.date}</td>
                <td>{game.opponent}</td>
                <td>
                  <span className={game.result === 'W' ? 'result-win' : game.result === 'L' ? 'result-loss' : ''}>
                    {game.result}
                  </span>
                </td>
                <td>{game.scoreFor}-{game.scoreAgainst}</td>
                <td>{game.location}</td>
                <td>
                  {game.isPlayoff && <span className="game-type playoff-badge">Playoff</span>}
                  {game.isDistrict && <span className="game-type district-badge">District</span>}
                  {game.notes ? ` ${game.notes}` : ''}
                </td>
                <td>
                  {game.source && <span className="source-link">{game.source}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
