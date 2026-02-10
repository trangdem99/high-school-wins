import Link from 'next/link';
import {
  getTeamById,
  RIDGE_VIEW_GAMES,
  RIDGE_VIEW_SEASONS,
} from '@/lib/data';
import { ClassificationBar } from '@/components/ClassificationBar';
import GameLogTable from '@/components/GameLogTable';

interface GameLogPageProps {
  params: Promise<{ teamId: string }>;
}

/**
 * Section L & M: Game log page.
 * FIX L: Logo doesn't overlap divider, no Points For/Against.
 * FIX M: No brown on date column, no footer source note.
 */
export default async function GameLogPage({ params }: GameLogPageProps) {
  const { teamId } = await params;
  const team = getTeamById(teamId);

  if (!team) {
    return <div className="container"><p>Team not found.</p></div>;
  }

  const totalGames = RIDGE_VIEW_GAMES.length;
  const totalWins = RIDGE_VIEW_GAMES.filter((g) => g.result === 'W').length;
  const totalLosses = RIDGE_VIEW_GAMES.filter((g) => g.result === 'L').length;
  const winPct = totalGames > 0 ? (totalWins / totalGames).toFixed(3) : '.000';

  const cssVars = {
    '--team-primary': team.colors.primary,
    '--team-secondary': team.colors.secondary,
    '--team-tertiary': team.colors.tertiary,
  } as React.CSSProperties;

  const season = RIDGE_VIEW_SEASONS[0];

  return (
    <div style={cssVars}>
      <div className="container">
        <div className="catalog-card">
          <ClassificationBar
            path={`${team.name.toUpperCase()} > ${team.sport.toUpperCase()} > GAME LOG`}
            catalogNumber={`${team.catalogNumber}-GL`}
          />

          {/* Filing Bar */}
          <div className="filing-bar">
            <div className="filing-item">
              <span className="filing-label">DOCUMENT TYPE:</span>
              <span className="filing-value">All Time Game Log</span>
            </div>
            <div className="filing-item">
              <span className="filing-label">TEAM:</span>
              <span className="filing-value">{team.name} {team.mascot}</span>
            </div>
            <div className="filing-item">
              <span className="filing-label">SPORT:</span>
              <span className="filing-value">{team.sport}</span>
            </div>
            <div className="filing-item">
              <span className="filing-label">TOTAL GAMES:</span>
              <span className="filing-value">{totalGames}</span>
            </div>
          </div>

          {/* FIX L: Page header - logo positioned to not overlap divider line */}
          <div className="article-header" style={{ position: 'relative', paddingLeft: '140px' }}>
            <div
              className="team-logo team-logo-sm"
              style={{
                position: 'absolute',
                left: 'var(--space-lg)',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            >
              {team.letter}
            </div>
            <Link href={`/team/${teamId}`} className="back-button">
              &larr; Back to Profile
            </Link>
            <h1 className="page-title">All Time Game Log</h1>
            <p className="page-subtitle">{team.name} {team.mascot} {team.sport}</p>
          </div>

          {/* FIX L: Summary stats - no Points For / Points Against */}
          <div className="summary-section">
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-value">{totalGames}</div>
                <div className="summary-label">Total Games</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{totalWins}</div>
                <div className="summary-label">Wins</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{totalLosses}</div>
                <div className="summary-label">Losses</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{winPct}</div>
                <div className="summary-label">Win %</div>
              </div>
            </div>
          </div>
        </div>

        {/* FIX M: Game log table - no footer, no brown on date column */}
        <div className="catalog-card">
          <GameLogTable
            seasonLabel={`${season.season} Season`}
            seasonInfo={`Record: ${season.wins}-${season.losses} (${season.districtRecord} District) | Playoff Result: ${season.playoffResult} | Class: ${season.classification}`}
            games={RIDGE_VIEW_GAMES}
          />
          {/* FIX M: Source note footer removed entirely */}
        </div>
      </div>
    </div>
  );
}
