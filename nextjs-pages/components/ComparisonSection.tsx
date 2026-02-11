import type { Team, StatItem, HeadToHeadGame } from '@/lib/data';
import TeamLogo from './TeamLogo';

interface ComparisonHeaderProps {
  leftTeam: Team;
  rightTeam: Team;
  leftRecord: string;
  rightRecord: string;
}

export function ComparisonHeader({ leftTeam, rightTeam, leftRecord, rightRecord }: ComparisonHeaderProps) {
  return (
    <div className="comparison-header active">
      <div className="comparison-split">
        <div className="comparison-team left">
          <TeamLogo team={leftTeam} size="md" />
          <h1 className="comparison-headline" style={{ color: leftTeam.colors.primary }}>
            {leftTeam.name}
          </h1>
          <h2 className="comparison-mascot">{leftTeam.mascot}</h2>
          <p className="comparison-subheadline">{leftTeam.sport}</p>
          <div className="comparison-record">ALL-TIME: {leftRecord}</div>
        </div>
        <div className="comparison-team right">
          <TeamLogo team={rightTeam} size="md" />
          <h1 className="comparison-headline" style={{ color: rightTeam.colors.primary }}>
            {rightTeam.name}
          </h1>
          <h2 className="comparison-mascot">{rightTeam.mascot}</h2>
          <p className="comparison-subheadline">{rightTeam.sport}</p>
          <div className="comparison-record">ALL-TIME: {rightRecord}</div>
        </div>
      </div>
    </div>
  );
}

interface ComparisonStatsProps {
  leftStats: StatItem[];
  rightStats: StatItem[];
  leftColor: string;
  rightColor: string;
  totalTeams?: number;
}

export function ComparisonStats({ leftStats, rightStats, leftColor, rightColor, totalTeams = 17 }: ComparisonStatsProps) {
  const parseValue = (v: string) => {
    if (v === '--') return -Infinity;
    return parseFloat(v);
  };

  return (
    <div className="stats-section comparison-mode">
      <h3 className="section-title">I. All-Time Stats</h3>
      <div className="rank-note">&#9733; Rank = among {totalTeams} teams &#9733;</div>

      <div className="stats-columns">
        <div className="stats-container left">
          <div className="stats-grid">
            {leftStats.map((stat, i) => {
              const lv = parseValue(stat.value);
              const rv = parseValue(rightStats[i]?.value ?? '--');
              const isWinner = lv > rv;
              return (
                <div
                  className={`stat-item ${isWinner ? 'winner' : ''}`}
                  key={i}
                  style={isWinner ? { borderLeftColor: leftColor } : undefined}
                >
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value" style={{ color: leftColor }}>{stat.value}</div>
                  {stat.record && <div className="stat-record">{stat.record}</div>}
                  {stat.note && <div className="stat-note">{stat.note}</div>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="stats-container right">
          <div className="stats-grid">
            {rightStats.map((stat, i) => {
              const rv = parseValue(stat.value);
              const lv = parseValue(leftStats[i]?.value ?? '--');
              const isWinner = rv > lv;
              return (
                <div
                  className={`stat-item ${isWinner ? 'winner' : ''}`}
                  key={i}
                  style={isWinner ? { borderLeftColor: rightColor } : undefined}
                >
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value" style={{ color: rightColor }}>{stat.value}</div>
                  {stat.record && <div className="stat-record">{stat.record}</div>}
                  {stat.note && <div className="stat-note">{stat.note}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface HeadToHeadSectionProps {
  leftTeam: Team;
  rightTeam: Team;
  games: HeadToHeadGame[];
  leftWins: number;
  rightWins: number;
  leftStreak: number;
  rightStreak: number;
  leftStreakActive?: boolean;
  rightStreakActive?: boolean;
  leftLargest: number | null;
  rightLargest: number | null;
}

export function HeadToHeadSection({
  leftTeam,
  rightTeam,
  games,
  leftWins,
  rightWins,
  leftStreak,
  rightStreak,
  leftStreakActive,
  rightStreakActive,
  leftLargest,
  rightLargest,
}: HeadToHeadSectionProps) {
  const leftColor = leftTeam.colors.primary;
  const rightColor = rightTeam.colors.primary === '#000000' ? '#1a1a1a' : rightTeam.colors.primary;
  const totalGames = games.length;

  const statRows = [
    {
      label: 'Wins',
      leftVal: leftWins,
      rightVal: rightWins,
      leftNote: undefined as string | undefined,
      rightNote: undefined as string | undefined,
    },
    {
      label: 'Longest Win Streak',
      leftVal: leftStreak,
      rightVal: rightStreak,
      leftNote: leftStreakActive ? 'Active' : undefined,
      rightNote: rightStreakActive ? 'Active' : undefined,
    },
    {
      label: 'Largest Victory',
      leftVal: leftLargest ?? 0,
      rightVal: rightLargest ?? 0,
      leftNote: undefined,
      rightNote: undefined,
    },
  ];

  return (
    <div className="table-section">
      <h3 className="section-title">III. Head to Head</h3>
      <div className="h2h-matchups-note">&#9733; Total Match-ups = {totalGames} &#9733;</div>

      {statRows.map((row, i) => (
        <div className="h2h-wins-cards" key={i}>
          <div className="h2h-card-container left">
            <div
              className={`h2h-card ${row.leftVal > row.rightVal ? 'winner' : ''}`}
              style={row.leftVal > row.rightVal ? { borderLeftColor: leftColor } : undefined}
            >
              <div className="h2h-card-label">{row.label}</div>
              <div className="h2h-card-value" style={{ color: leftColor }}>
                {row.label === 'Largest Victory' && leftLargest === null ? '--' : row.leftVal}
              </div>
              {row.leftNote && <div className="h2h-card-note">{row.leftNote}</div>}
            </div>
          </div>
          <div className="h2h-card-container right">
            <div
              className={`h2h-card ${row.rightVal > row.leftVal ? 'winner' : ''}`}
              style={row.rightVal > row.leftVal ? { borderLeftColor: rightColor } : undefined}
            >
              <div className="h2h-card-label">{row.label}</div>
              <div className="h2h-card-value" style={{ color: rightColor }}>
                {row.label === 'Largest Victory' && rightLargest === null ? '--' : row.rightVal}
              </div>
              {row.rightNote && <div className="h2h-card-note">{row.rightNote}</div>}
            </div>
          </div>
        </div>
      ))}

      <div className="head-to-head-container table-responsive">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th className="team-column" style={{ textAlign: 'center' }}>{leftTeam.name}</th>
              <th className="team-column" style={{ textAlign: 'center' }}>{rightTeam.name}</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, i) => {
              const leftWon = game.leftScore > game.rightScore;
              const rightWon = game.rightScore > game.leftScore;
              return (
                <tr key={i}>
                  <td>{game.date}</td>
                  <td style={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: leftWon ? '1.1rem' : undefined,
                    color: leftWon ? leftColor : '#999',
                  }}>
                    {game.leftScore}
                  </td>
                  <td style={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: rightWon ? '1.1rem' : undefined,
                    color: rightWon ? rightColor : '#999',
                  }}>
                    {game.rightScore}
                  </td>
                  <td>{game.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
