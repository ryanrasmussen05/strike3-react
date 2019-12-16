export interface Pick {
  team: string,
  status: string,
  tieBreakerAwayTeamPoints?: number | string,
  tieBreakerHomeTeamPoints?: number | string,
}

export type PlayerPicks = Array<Pick>

export interface Picks { [key: string]: PlayerPicks }

export interface PickSubmitPayload {
  team: string,
  week: number,
  status: string,
  userId: string,
  tieBreakerHomeTeamPoints: string,
  tieBreakerAwayTeamPoints: string,
}
