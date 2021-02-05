import {round, trim} from 'lodash';
import {Team} from './interfaces';

export function generateTeamFromData(data: any): Team {
  return {
    id: data.id,
    abbreviation: data.abbrev,
    name: `${trim(data.location)} ${trim(data.nickname)}`,
    logoURL: data.logo,
    wavierRank: data.waiverRank,
    roster: data.roster.entries,
    wins: data.record.overall.wins,
    losses: data.record.overall.loses,
    ties: data.record.overall.ties,
    divisionWins: data.record.division.wins,
    divisionLosses: data.record.division.losses,
    divisionTies: data.record.division.ties,
    homeWins: data.record.home.wins,
    homeLosses: data.record.home.losses,
    homeTies: data.record.home.ties,
    awayWins: data.record.away.wins,
    awayLosses: data.record.away.losses,
    awayTies: data.record.away.ties,
    totalPointsScored: data.points,
    regularSeasonPointsFor: data.record.overall.pointsFor,
    regularSeasonPointsAgainst: data.record.overall.pointsAgainst,
    winningPercentage: round(data.record.overall.percentage * 100, 2),
    playoffSeed: data.playoffSeed,
    finalStandingsPosition: data.rankCalculatedFinal,
  };
}
