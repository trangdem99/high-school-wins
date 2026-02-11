import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getTeamById,
  TEAMS,
  RIDGE_VIEW_GAMES,
  RIDGE_VIEW_SEASONS,
} from '@/lib/data';
import type { Team } from '@/lib/data';
import { ClassificationBar } from '@/components/ClassificationBar';
import GameLogTable from '@/components/GameLogTable';

interface GameLogPageProps {
  teamId: string;
  team: Team;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: TEAMS.map((t) => ({ params: { teamId: t.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<GameLogPageProps> = async ({ params }) => {
  const teamId = params!.teamId as string;
  const team = getTeamById(teamId);
  if (!team) return { notFound: true };
  return { props: { teamId, team } };
};

export default function GameLogPage({ teamId, team }: GameLogPageProps) {
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
    <>
      <Head>
        <title>Game Log - {team.name} {team.mascot} - High School Wins</title>
      </Head>
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

            {/* Page header */}
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

            {/* Summary stats */}
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

          {/* Game log table */}
          <div className="catalog-card">
            <GameLogTable
              seasonLabel={`${season.season} Season`}
              seasonInfo={`Record: ${season.wins}-${season.losses} (${season.districtRecord} District) | Playoff Result: ${season.playoffResult} | Class: ${season.classification}`}
              games={RIDGE_VIEW_GAMES}
            />
          </div>
        </div>
      </div>
    </>
  );
}
