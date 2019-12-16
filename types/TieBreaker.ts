export interface TieBreaker {
  awayTeam: string,
  homeTeam: string,
  awayTeamPoints: string,
  homeTeamPoints: string,
  week?: number,
}

export type TieBreakers = Array<TieBreaker>

export interface TieBreakerSubmitPayload {
  week: number,
  userId: string,
  tieBreakerHomeTeamPoints: string,
  tieBreakerAwayTeamPoints: string,
}
