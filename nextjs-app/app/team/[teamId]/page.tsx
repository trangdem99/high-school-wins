import TeamProfileClient from './TeamProfileClient';

interface TeamPageProps {
  params: Promise<{ teamId: string }>;
}

/**
 * Server component wrapper for team profile page.
 * Delegates to client component for interactivity.
 */
export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params;
  return <TeamProfileClient teamId={teamId} />;
}
