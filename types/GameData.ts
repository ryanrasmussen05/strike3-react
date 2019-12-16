import { TieBreakers } from './TieBreaker';
import { Schedule } from './Schedule';

export interface GameDataPick {
  week: number,
  locked: boolean,
  team?: string,
  status: string,
  tieBreakerAwayTeamPoints?: string,
  tieBreakerHomeTeamPoints?: string,
  tieBreakerLocked: boolean,
}

export interface GameDataPlayer {
  id: string,
  name: string,
  email: string,
  admin: boolean,
  superuser: boolean,
  picks: Array<GameDataPick>,
  strikes: number,
  eliminationWeek: number,
  rank?: number,
}

export interface GameData {
  players: Array<GameDataPlayer>,
  week: number,
  tieBreakers: TieBreakers,
  schedule: Schedule,
}
