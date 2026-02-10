/**
 * Team data model and sample data.
 * Single source of truth for team information (DRY).
 */

export interface TeamColors {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface Team {
  id: string;
  name: string;
  mascot: string;
  letter: string;
  colors: TeamColors;
  location: string;
  state: string;
  conference: string;
  classification: string;
  sport: string;
  catalogNumber: string;
}

export interface StatItem {
  label: string;
  value: string;
  rank?: string;
  record?: string;
  note?: string;
}

export interface SeasonRecord {
  season: number;
  wins: number;
  losses: number;
  ties: number;
  winPct: string;
  classification: string;
  conference: string;
  postseason: string;
  districtRecord?: string;
  playoffResult?: string;
}

export interface Game {
  date: string;
  opponent: string;
  result: 'W' | 'L' | 'T';
  scoreFor: number;
  scoreAgainst: number;
  location: string;
  notes: string;
  source?: string;
  isDistrict?: boolean;
  isPlayoff?: boolean;
}

export interface Opponent {
  name: string;
  games: number;
  wins: number;
  losses: number;
  ties: number;
  winPct: string;
}

export interface HeadToHeadGame {
  date: string;
  leftScore: number;
  rightScore: number;
  notes: string;
}

export const TEAMS: Team[] = [
  {
    id: 'ridge-view',
    name: 'Ridge View',
    mascot: 'Raptors',
    letter: 'R',
    colors: { primary: '#FF8C00', secondary: '#FFD700', tertiary: '#000000' },
    location: 'Holstein, Iowa',
    state: 'iowa',
    conference: 'Western Valley',
    classification: '1A',
    sport: 'Football',
    catalogNumber: 'IA-FTB-WVC-RV',
  },
  {
    id: 'oabcig',
    name: 'OABCIG',
    mascot: 'Falcons',
    letter: 'F',
    colors: { primary: '#000000', secondary: '#C0C0C0', tertiary: '#C0C0C0' },
    location: 'Ida Grove, Iowa',
    state: 'iowa',
    conference: 'Western Valley',
    classification: '2A',
    sport: 'Football',
    catalogNumber: 'IA-FTB-WVC-OA',
  },
  {
    id: 'cherokee-washington',
    name: 'Cherokee Washington',
    mascot: 'Braves',
    letter: 'B',
    colors: { primary: '#B22222', secondary: '#FFD700', tertiary: '#FFFFFF' },
    location: 'Cherokee, Iowa',
    state: 'iowa',
    conference: 'Western Valley',
    classification: '2A',
    sport: 'Football',
    catalogNumber: 'IA-FTB-WVC-CW',
  },
];

export function getTeamById(id: string): Team | undefined {
  return TEAMS.find((t) => t.id === id);
}

export function getTeamsByState(state: string): Team[] {
  return TEAMS.filter((t) => t.state === state.toLowerCase());
}

export const RIDGE_VIEW_STATS: StatItem[] = [
  { label: 'Win/Loss', value: '.600', rank: '5th', record: '6-4-0' },
  { label: 'State Titles', value: '0', rank: 'T-1st', record: '0-0' },
  { label: 'Playoff Appearances', value: '1', rank: 'T-1st', note: 'Postseason qualifications' },
  { label: 'Playoff Record', value: '.500', rank: '2nd', record: '1-1' },
  { label: 'District Record', value: '.800', rank: '2nd', record: '4-1' },
];

export const OABCIG_STATS: StatItem[] = [
  { label: 'Win/Loss', value: '1.000', record: '1-0-0' },
  { label: 'State Titles', value: '0', record: '0-0' },
  { label: 'Playoff Appearances', value: '0', note: 'Postseason qualifications' },
  { label: 'Playoff Record', value: '--', record: '0-0' },
  { label: 'District Record', value: '--', record: '0-0' },
];

export const RIDGE_VIEW_SEASONS: SeasonRecord[] = [
  {
    season: 2025,
    wins: 6,
    losses: 4,
    ties: 0,
    winPct: '.600',
    classification: '1A',
    conference: 'Western Valley',
    postseason: 'Playoff Round 1',
    districtRecord: '4-1',
    playoffResult: 'Second Round',
  },
];

export const RIDGE_VIEW_GAMES: Game[] = [
  { date: 'Aug 29, 2025', opponent: 'OABCIG Falcons', result: 'L', scoreFor: 7, scoreAgainst: 24, location: 'Holstein', notes: 'Season Opener', source: 'GoBound' },
  { date: 'Sep 5, 2025', opponent: 'South Central Calhoun Titans', result: 'W', scoreFor: 28, scoreAgainst: 6, location: 'Holstein', notes: '', source: 'GoBound' },
  { date: 'Sep 12, 2025', opponent: 'Storm Lake Tornadoes', result: 'W', scoreFor: 35, scoreAgainst: 14, location: 'Storm Lake', notes: '', source: 'GoBound' },
  { date: 'Sep 19, 2025', opponent: 'Alta-Aurelia Warriors', result: 'W', scoreFor: 21, scoreAgainst: 14, location: 'Holstein', notes: '', isDistrict: true, source: 'GoBound' },
  { date: 'Sep 26, 2025', opponent: 'Lawton-Bronson Eagles', result: 'W', scoreFor: 42, scoreAgainst: 0, location: 'Holstein', notes: 'Homecoming', isDistrict: true, source: 'GoBound' },
  { date: 'Oct 3, 2025', opponent: 'West Lyon Wildcats', result: 'L', scoreFor: 14, scoreAgainst: 28, location: 'Inwood', notes: '', isDistrict: true, source: 'GoBound' },
  { date: 'Oct 10, 2025', opponent: 'Hinton Blackhawks', result: 'W', scoreFor: 28, scoreAgainst: 21, location: 'Holstein', notes: '', isDistrict: true, source: 'GoBound' },
  { date: 'Oct 17, 2025', opponent: 'Woodbury Central Wildcats', result: 'W', scoreFor: 30, scoreAgainst: 35, location: 'Moville', notes: '', isDistrict: true, source: 'GoBound' },
  { date: 'Oct 24, 2025', opponent: 'Tri-Center Trojans', result: 'W', scoreFor: 42, scoreAgainst: 27, location: 'Holstein', notes: 'Class 1A First Round', isPlayoff: true, source: 'GoBound' },
  { date: 'Oct 31, 2025', opponent: '@ South Hardin Tigers', result: 'L', scoreFor: 0, scoreAgainst: 20, location: '--', notes: 'Class 1A Second Round', isPlayoff: true, source: 'GoBound' },
];

export const RIDGE_VIEW_OPPONENTS: Opponent[] = [
  { name: 'Alta-Aurelia', games: 1, wins: 1, losses: 0, ties: 0, winPct: '1.000' },
  { name: 'Hinton', games: 1, wins: 1, losses: 0, ties: 0, winPct: '1.000' },
  { name: 'Lawton-Bronson', games: 1, wins: 1, losses: 0, ties: 0, winPct: '1.000' },
  { name: 'OABCIG', games: 1, wins: 0, losses: 1, ties: 0, winPct: '.000' },
  { name: 'South Central Calhoun', games: 1, wins: 1, losses: 0, ties: 0, winPct: '1.000' },
  { name: 'South Hardin', games: 1, wins: 0, losses: 1, ties: 0, winPct: '.000' },
  { name: 'Storm Lake', games: 1, wins: 1, losses: 0, ties: 0, winPct: '1.000' },
  { name: 'Tri-Center', games: 1, wins: 1, losses: 0, ties: 0, winPct: '1.000' },
  { name: 'West Lyon', games: 1, wins: 0, losses: 1, ties: 0, winPct: '.000' },
  { name: 'Woodbury Central', games: 1, wins: 0, losses: 1, ties: 0, winPct: '.000' },
];

export const HEAD_TO_HEAD_GAMES: HeadToHeadGame[] = [
  { date: 'Aug 29, 2025', leftScore: 7, rightScore: 24, notes: 'Holstein, IA' },
];

/** Compute cumulative win differential per season */
export function computeWinDifferential(seasons: SeasonRecord[]): { season: number; differential: number }[] {
  let cumulative = 0;
  return seasons.map((s) => {
    cumulative += s.wins - s.losses;
    return { season: s.season, differential: cumulative };
  });
}
