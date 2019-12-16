export interface Player {
  email: string,
  id: string,
  name: string,
  superuser: boolean,
  admin: boolean,
}

export type Players = Array<Player>
