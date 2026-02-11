import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { getTeamsByState, TEAMS } from '@/lib/data';
import type { Team } from '@/lib/data';

interface StatePageProps {
  state: string;
  stateName: string;
  teams: Team[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const states = [...new Set(TEAMS.map((t) => t.state))];
  // Also include states from the home page that may not have teams yet
  const allStates = [...new Set([...states, 'iowa', 'minnesota'])];
  return {
    paths: allStates.map((s) => ({ params: { state: s } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StatePageProps> = async ({ params }) => {
  const state = params!.state as string;
  const stateName = state.charAt(0).toUpperCase() + state.slice(1);
  const teams = getTeamsByState(state);
  return { props: { state, stateName, teams } };
};

export default function StatePage({ stateName, teams }: StatePageProps) {
  return (
    <>
      <Head>
        <title>{stateName} Schools - High School Wins</title>
      </Head>
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
    </>
  );
}
