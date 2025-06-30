

export type IncentiveCodeRequest = {
  id: number;
  value?: string
}

export type IncentiveCode = {
  id: string,
  incentiveId: number,
  value?: string,
}

export type IncentivesResponse = {
  id: number,
  game: string,
  title: string,
  info: string,
  incentiveType: 'freeChoice' | 'fixedChoice' | 'milestone',
  endtime: string,
  incentiveValues?: IncentiveValues[]
  milestone?: Milestone
}

export type Milestone = {
  raised: number
  goal: number
}

export type IncentiveValues = {
  name: string,
  amount: number,
}

export type IncentiveCodeResponse = {
  id: string;
}

export type SelectContextValue = {
  id: number;
  value?: string;
}
