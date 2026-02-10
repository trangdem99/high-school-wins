import type { Team } from '@/lib/data';

interface TeamLogoProps {
  team: Team;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: { width: 36, height: 36, fontSize: '1.25rem', border: '3px' },
  md: { width: 60, height: 60, fontSize: '2rem', border: '4px' },
  lg: { width: 120, height: 120, fontSize: '5rem', border: '5px' },
};

export default function TeamLogo({ team, size = 'lg' }: TeamLogoProps) {
  const s = SIZES[size];
  return (
    <div
      style={{
        width: s.width,
        height: s.height,
        borderRadius: '50%',
        backgroundColor: team.colors.primary,
        border: `${s.border} solid ${team.colors.secondary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: s.fontSize,
        fontWeight: 900,
        color: team.colors.tertiary,
        flexShrink: 0,
      }}
    >
      {team.letter}
    </div>
  );
}
