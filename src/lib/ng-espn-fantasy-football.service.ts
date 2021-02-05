import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Boxscore, Team} from './interfaces';
import {generateBoxscoreFromData, generateTeamFromData} from './utils';

@Injectable({
  providedIn: 'root',
})
export class NgEspnFantasyFootballService {
  private baseUrl = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons';

  constructor(private http: HttpClient) {}

  public setCookies(espnS2: string, SWID: string): void {
    document.cookie.split(';').forEach(c => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    document.cookie = `espn_s2=${espnS2};SameSite=None;Secure`;
    document.cookie = `SWID=${SWID};SameSite=None;Secure`;
  }

  /**
   * Returns an array of Team object representing each fantasy football team in the FF league.
   *
   * @param   seasonId The season to grab data from.
   * @param   scoringPeriodId The scoring period in which to grab teams from.
   * @returns The list of teams.
   */
  getTeamsAtWeek(
    leagueId: number,
    seasonId: number,
    scoringPeriodId: number
  ): Observable<Team[]> {
    const url = `${this.baseUrl}/${seasonId}/segments/0/leagues/${leagueId}?scoringPeriodId=${scoringPeriodId}&view=mRoster&view=mTeam`;
    return this.http
      .get<any>(url, {withCredentials: true})
      .pipe(
        map(response =>
          response.teams.map((data: any) => generateTeamFromData(data))
        )
      );
  }

  getBoxscoresAtWeek(
    leagueId: number,
    seasonId: number,
    scoringPeriodId: number,
    matchupPeriodId: number
  ): Observable<Boxscore[]> {
    const url = `${this.baseUrl}/${seasonId}/segments/0/leagues/${leagueId}?view=mMatchup&view=mMatchupScore&scoringPeriodId=${scoringPeriodId}`;
    return this.http
      .get<any>(url, {withCredentials: true})
      .pipe(
        map(response =>
          response.schedule.filter(
            (sch: any) => sch.matchupPeriodId === matchupPeriodId
          )
        ),
        map(schedule =>
          schedule.map((data: any) => generateBoxscoreFromData(data))
        )
      );
  }
}
