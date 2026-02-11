import { useState } from 'react';
import Link from 'next/link';
import {
  getTeamById,
  TEAMS,
  RIDGE_VIEW_STATS,
  OABCIG_STATS,
  RIDGE_VIEW_SEASONS,
  RIDGE_VIEW_OPPONENTS,
  HEAD_TO_HEAD_GAMES,
  computeWinDifferential,
  type Team,
  type StatItem,
} from '@/lib/data';
import { ClassificationBar, FilingBar } from '@/components/ClassificationBar';
import TeamLogo from '@/components/TeamLogo';
import StatsGrid from '@/components/StatsGrid';
import SeasonTable from '@/components/SeasonTable';
import OpponentTable from '@/components/OpponentTable';
import WinDifferentialChart from '@/components/WinDifferentialChart';
import { ComparisonHeader, ComparisonStats, HeadToHeadSection } from '@/components/ComparisonSection';

function getStatsForTeam(teamId: string): StatItem[] {
  switch (teamId) {
    case 'ridge-view':
      return RIDGE_VIEW_STATS;
    case 'oabcig':
      return OABCIG_STATS;
    default:
      return [];
  }
}

function getRecordString(teamId: string): string {
  switch (teamId) {
    case 'ridge-view': return '6-4';
    case 'oabcig': return '1-0';
    default: return '0-0';
  }
}

interface TeamProfileClientProps {
  teamId: string;
}

export default function TeamProfileClient({ teamId }: TeamProfileClientProps) {
  const team = getTeamById(teamId);
  const [compareTeamId, setCompareTeamId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  if (!team) return <div className="container"><p>Team not found.</p></div>;

  const compareTeam = compareTeamId ? getTeamById(compareTeamId) : null;
  const isCompareMode = !!compareTeam;

  const teamStats = getStatsForTeam(teamId);
  const winDiffData = computeWinDifferential(RIDGE_VIEW_SEASONS);

  const otherTeams = TEAMS.filter((t) => t.id !== teamId);

  const handleCompareSelect = (t: Team) => {
    setCompareTeamId(t.id);
    setShowDropdown(false);
  };

  const handleClearCompare = () => {
    setCompareTeamId(null);
    setShowDropdown(false);
  };

  const cssVars = {
    '--team-primary': team.colors.primary,
    '--team-secondary': team.colors.secondary,
    '--team-tertiary': team.colors.tertiary,
    '--stat-value-color': team.colors.primary,
    '--comparison-stat-value-color': compareTeam?.colors.primary || '#000000',
  } as React.CSSProperties;

  return (
    <div style={cssVars}>
      <div className="container">
        <div className="catalog-card">
          <ClassificationBar
            path={`${team.name.toUpperCase()} > ${team.sport.toUpperCase()}`}
            catalogNumber={team.catalogNumber}
          />
          <FilingBar team={team} showSportDropdown />

          {/* Section E/G: Article Header or Comparison Header */}
          {isCompareMode ? (
            <ComparisonHeader
              leftTeam={team}
              rightTeam={compareTeam}
              leftRecord={getRecordString(teamId)}
              rightRecord={getRecordString(compareTeam.id)}
            />
          ) : (
            <div className="article-header">
              <div className="team-logo">{team.letter}</div>

              {/* Compare button / dropdown */}
              <div style={{ position: 'absolute', right: 'var(--space-lg)', top: 'var(--space-xl)' }}>
                <button
                  className="compare-button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ position: 'static' }}
                >
                  Compare Team
                </button>
                {showDropdown && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '130px',
                    background: 'var(--color-bg-card)',
                    border: 'var(--border-thick)',
                    boxShadow: 'var(--shadow-dropdown)',
                    zIndex: 1000,
                    width: 350,
                    maxHeight: 400,
                    overflowY: 'auto',
                  }}>
                    {otherTeams.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleCompareSelect(t)}
                        style={{
                          padding: 'var(--space-md)',
                          borderBottom: '1px solid #eee',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-md)',
                        }}
                      >
                        <TeamLogo team={t} size="sm" />
                        <span style={{ fontWeight: 700 }}>{t.name} {t.mascot}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="header-text">
                <h1 className="headline">{team.name.toUpperCase()}</h1>
                <h2 className="mascot-name">{team.mascot.toUpperCase()}</h2>
                <p className="subheadline">{team.sport}</p>
                <div className="team-colors">
                  <div className="color-box" style={{ backgroundColor: team.colors.primary }} />
                  <div className="color-box" style={{ backgroundColor: team.colors.secondary }} />
                  <div className="color-box" style={{ backgroundColor: team.colors.tertiary }} />
                </div>
                <div className="all-time-record">ALL-TIME RECORD: {getRecordString(teamId)}-0</div>
              </div>
            </div>
          )}

          {/* Clear comparison button */}
          {isCompareMode && (
            <div style={{ textAlign: 'center', padding: 'var(--space-sm)' }}>
              <button className="btn btn-secondary" onClick={handleClearCompare} style={{ fontSize: '0.75rem', padding: '0.4rem 1rem' }}>
                ✕ Clear Comparison
              </button>
            </div>
          )}

          {/* Section F/G: Stats */}
          {isCompareMode ? (
            <ComparisonStats
              leftStats={teamStats}
              rightStats={getStatsForTeam(compareTeam!.id)}
              leftColor={team.colors.primary}
              rightColor={compareTeam!.colors.primary === '#000000' ? '#1a1a1a' : compareTeam!.colors.primary}
            />
          ) : (
            <div className="stats-section">
              <h3 className="section-title">I. All-Time Stats</h3>
              <div className="rank-note">&#9733; Rank = among 17 teams &#9733;</div>
              <div className="stats-columns">
                <div className="stats-container left">
                  <StatsGrid stats={teamStats} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section II: Chart */}
        <div className="catalog-card">
          <WinDifferentialChart
            title="II. Cumulative Win Differential"
            subtitle="Wins - losses. A great way to see program winning trends over time"
            datasets={[
              {
                label: `${team.name} ${team.mascot}`,
                data: winDiffData.map((d) => ({
                  season: d.season,
                  differential: d.differential,
                  record: '6-4',
                })),
                color: team.colors.primary,
              },
              ...(isCompareMode
                ? [
                    {
                      label: `${compareTeam!.name} ${compareTeam!.mascot}`,
                      data: [{ season: 2025, differential: 1, record: '1-0' }],
                      color: compareTeam!.colors.primary === '#000000' ? '#333333' : compareTeam!.colors.primary,
                    },
                  ]
                : []),
            ]}
          />

          {/* Comparison Chart (comparison mode only) */}
          {isCompareMode && (
            <div className="comparison-chart-section">
              <WinDifferentialChart
                title="Comparison Chart – Win Differential"
                subtitle="How teams compare by win differential over time"
                datasets={[
                  {
                    label: `${team.name}`,
                    data: winDiffData.map((d) => ({
                      season: d.season,
                      differential: d.differential,
                      record: '6-4',
                    })),
                    color: team.colors.primary,
                  },
                  {
                    label: `${compareTeam!.name}`,
                    data: [{ season: 2025, differential: 1, record: '1-0' }],
                    color: compareTeam!.colors.primary === '#000000' ? '#333333' : compareTeam!.colors.primary,
                  },
                ]}
              />
            </div>
          )}
        </div>

        {/* Section III: Head-to-Head (comparison mode) / Season-by-Season */}
        {isCompareMode ? (
          <div className="catalog-card">
            <HeadToHeadSection
              leftTeam={team}
              rightTeam={compareTeam!}
              games={HEAD_TO_HEAD_GAMES}
              leftWins={0}
              rightWins={1}
              leftStreak={0}
              rightStreak={1}
              rightStreakActive
              leftLargest={null}
              rightLargest={17}
            />
          </div>
        ) : null}

        {/* Section III/IV: Season-by-Season Table */}
        <div className="catalog-card">
          <div className="table-section">
            <div className="section-header-with-filters">
              <h3 className="section-title">{isCompareMode ? 'IV' : 'III'}. Season-by-Season Index</h3>
              <Link href={`/team/${teamId}/gamelog`} className="game-log-button">
                View All Time Game Log
              </Link>
            </div>
            <SeasonTable seasons={RIDGE_VIEW_SEASONS} />
          </div>
        </div>

        {/* Section IV: Opponent Table (hidden in comparison mode) */}
        {!isCompareMode && (
          <div className="catalog-card">
            <div className="table-section">
              <div className="section-header-with-filters">
                <h3 className="section-title">IV. All-Time Opponent Index</h3>
              </div>
              <OpponentTable opponents={RIDGE_VIEW_OPPONENTS} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
