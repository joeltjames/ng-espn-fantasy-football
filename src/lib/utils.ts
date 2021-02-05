import {round, trim} from 'lodash';
import {
  nflTeamIdToNFLTeam,
  nflTeamIdToNFLTeamAbbreviation,
  slotCategoryIdToPositionMap,
  statIdToStatNameMap,
} from './constants';
import {
  Boxscore,
  BoxscorePlayer,
  Player,
  PlayerStats,
  Team,
} from './interfaces';

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

export function generatePlayerStatsFromData(data: any): PlayerStats {
  return {};
}

export function getProjectedStats(player: any): any {
  return (player.stats as any[]).filter(stat => stat.statSourceId === 1)[0];
}

export function getActualStats(player: any): any {
  return (player.stats as any[]).filter(stat => stat.statSourceId === 0)[0];
}

export function generatePlayerFromData(data: any): Player {
  return {
    id: data.id,
    name: data.fullName,
    proTeam: nflTeamIdToNFLTeam[data.proTeamId],
    proTeamAbbreviation: nflTeamIdToNFLTeamAbbreviation[data.proTeamId],
  };
}

export function generateBoxscorePlayerFromData(data: any): BoxscorePlayer {
  const actualStats = getActualStats(data.playerPoolEntry.player);
  const projectedStats = getProjectedStats(data.playerPoolEntry.player);
  const calcRawStats = (stats: any) => {
    const results: any = {};
    if (stats) {
      Object.keys(statIdToStatNameMap).forEach(statId => {
        if (stats[parseInt(statId, 10)] != null) {
          results[statIdToStatNameMap[parseInt(statId, 10)]] =
            stats[parseInt(statId, 10)];
        }
      });
    }
    return results;
  };
  return {
    player: generatePlayerFromData(data.playerPoolEntry.player),
    position: slotCategoryIdToPositionMap[parseInt(data.lineupSlotId, 10)],
    totalPoints: data.playerPoolEntry.appliedStatTotal,
    totalProjectedPoints: round(
      getProjectedStats(data.playerPoolEntry.player)?.appliedTotal || 0,
      2
    ),
    pointBreakdown: {},
    projectedPointBreakdown: {},
    rawStats: calcRawStats(actualStats?.stats),
    projectedRawStats: calcRawStats(projectedStats?.stats),
  };
}

export function generateBoxscoreFromData(data: any): Boxscore {
  return {
    homeScore: data.home.totalPointsLive || data.home.totalPoints,
    homeTeamId: data.home.teamId,
    homeRoster: data.home.rosterForCurrentScoringPeriod.entries.map(
      (entry: any) => generateBoxscorePlayerFromData(entry)
    ),
    awayScore: data.away.totalPointsLive || data.away.totalPoints,
    awayTeamId: data.away.teamId,
    awayRoster: data.away.rosterForCurrentScoringPeriod.entries.map(
      (entry: any) => generateBoxscorePlayerFromData(entry)
    ),
  };
}
