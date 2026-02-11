import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getTeamById, TEAMS } from '@/lib/data';
import type { Team } from '@/lib/data';
import TeamProfileClient from '@/components/TeamProfileClient';

interface TeamPageProps {
  teamId: string;
  team: Team;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: TEAMS.map((t) => ({ params: { teamId: t.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TeamPageProps> = async ({ params }) => {
  const teamId = params!.teamId as string;
  const team = getTeamById(teamId);
  if (!team) return { notFound: true };
  return { props: { teamId, team } };
};

export default function TeamPage({ teamId }: TeamPageProps) {
  return (
    <>
      <Head>
        <title>Team Profile - High School Wins</title>
      </Head>
      <TeamProfileClient teamId={teamId} />
    </>
  );
}
