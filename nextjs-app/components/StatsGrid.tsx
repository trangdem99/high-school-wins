import type { StatItem } from '@/lib/data';

interface StatsGridProps {
  stats: StatItem[];
  showRanks?: boolean;
  valueColor?: string;
}

/**
 * Reusable stats grid used in both single-team and comparison modes (DRY).
 * Follows Single Responsibility: only renders stat items.
 */
export default function StatsGrid({ stats, showRanks = true, valueColor }: StatsGridProps) {
  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value" style={valueColor ? { color: valueColor } : undefined}>
            {stat.value}
            {showRanks && stat.rank && (
              <span className="stat-rank-badge">
                Rank: <span className="rank-position">{stat.rank}</span>
              </span>
            )}
          </div>
          {stat.record && <div className="stat-record">{stat.record}</div>}
          {stat.note && <div className="stat-note">{stat.note}</div>}
        </div>
      ))}
    </div>
  );
}
