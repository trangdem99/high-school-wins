import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getTeamsByState } from '@/lib/data';

interface StatePageProps {
  params: Promise<{ state: string }>;
}

/**
 * Section C: State page - School list
 */
export default async function StatePage({ params }: StatePageProps) {
  const { state } = await params;
  const stateName = state.charAt(0).toUpperCase() + state.slice(1);
  const teams = getTeamsByState(state);

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'HOME', href: '/' }, { label: stateName.toUpperCase() }]} />

      <div className="selection-card">
        <div className="selection-header">
          <h1>{stateName} Schools</h1>
          <p>Select a school to view sports archives</p>
        </div>

        <div className="school-list">
          {teams.map((team) => (
            <Link key={team.id} href={`/team/${team.id}`} className="school-card">
              <div
                className="school-logo"
                style={{
                  backgroundColor: team.colors.primary,
                  border: `3px solid ${team.colors.secondary}`,
                  color: team.colors.tertiary,
                }}
              >
                {team.letter}
              </div>
              <div className="school-name">{team.name} {team.mascot}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
