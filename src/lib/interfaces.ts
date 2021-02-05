import {round, trim} from 'lodash';

export interface Team {
  id: number;
  abbreviation: string;
  name: string;
  logoURL: string;
  wavierRank: number;
  roster: any[];
  wins: number;
  losses: number;
  ties: number;
  divisionWins: number;
  divisionLosses: number;
  divisionTies: number;
  homeWins: number;
  homeLosses: number;
  homeTies: number;
  awayWins: number;
  awayLosses: number;
  awayTies: number;
  totalPointsScored: number;
  regularSeasonPointsFor: number;
  regularSeasonPointsAgainst: number;
  winningPercentage: number;
  playoffSeed: number;
  finalStandingsPosition: number;
}

export interface Boxscore {
  homeScore: number;
  homeTeamId: number;
  homeRoster: BoxscorePlayer[];
  awayScore: number;
  awayTeamId: number;
  awayRoster: BoxscorePlayer[];
}

export interface PlayerStats {
  passingYards?: number;
  defensiveBlockedKickForTouchdowns?: number;
  defensiveFumbles?: number;
  defensiveInterceptions?: number;
  defensiveSacks?: number;
  fumbleReturnTouchdown?: number;
  interceptionReturnTouchdown?: number;
  kickoffReturnTouchdown?: number;
  passingTouchdowns?: number;
  puntReturnTouchdown?: number;
  receivingReceptions?: number;
  receivingTouchdowns?: number;
  rushingTouchdowns?: number;
  rushingYards?: number;
}

export interface BoxscorePlayer {
  player: Player;
  position: string;
  totalPoints: number;
  totalProjectedPoints: number;
  pointBreakdown: PlayerStats;
  projectedPointBreakdown: PlayerStats;
  rawStats: PlayerStats;
  projectedRawStats: PlayerStats;
}

export interface Player {
  id: number;
  name: string;
  proTeam: string;
  proTeamAbbreviation: string;
}
