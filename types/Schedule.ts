export interface ScheduleGame {
  awayTeam: string,
  homeTeam: string,
  time: number,
  timeString: string,
}

export type ScheduleWeek = Array<ScheduleGame>

export type Schedule = Array<ScheduleWeek>
