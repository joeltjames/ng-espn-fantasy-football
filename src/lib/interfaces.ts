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
