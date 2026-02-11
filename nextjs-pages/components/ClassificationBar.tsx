import Link from 'next/link';
import type { Team } from '@/lib/data';

interface ClassificationBarProps {
  path: string;
  catalogNumber: string;
}

export function ClassificationBar({ path, catalogNumber }: ClassificationBarProps) {
  return (
    <div className="classification-bar">
      <span>
        CLASSIFICATION: <Link href="/" className="breadcrumb-link">IOWA</Link> &gt; {path}
      </span>
      <span className="catalog-number">CAT. NO. {catalogNumber}</span>
    </div>
  );
}

interface FilingBarProps {
  team: Team;
  showSportDropdown?: boolean;
}

export function FilingBar({ team, showSportDropdown = false }: FilingBarProps) {
  return (
    <div className={`filing-bar ${showSportDropdown ? 'filing-bar-split' : ''}`}>
      <div className="filing-items-left">
        <div className="filing-item">
          <span className="filing-label">FILED UNDER:</span>
          <span className="filing-value">{team.conference} Conference</span>
        </div>
        <div className="filing-item">
          <span className="filing-label">LOCATION:</span>
          <span className="filing-value">{team.location}</span>
        </div>
        <div className="filing-item">
          <span className="filing-label">CLASS:</span>
          <span className="filing-value">{team.classification}</span>
        </div>
      </div>
      {showSportDropdown && (
        <div className="filing-item">
          <span className="filing-label">SPORT:</span>
          <span className="filing-value">{team.sport}</span>
        </div>
      )}
    </div>
  );
}
