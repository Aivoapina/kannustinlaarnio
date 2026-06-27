export type IncentiveCodeRequest = {
  id: number;
  value?: string
}

export type IncentiveCode = {
  id: string,
  incentiveId: number,
  value?: string,
}

export interface Incentive {
  type: 'freeChoice' | 'fixedChoice' | 'milestone',
  id: number,
  game: string,
  title: string,
  info: string,
  endtime: string,
}

export interface FreeChoice extends Incentive {
  type: 'freeChoice',
  incentiveValues: IncentiveValues[],
  incentivePattern: string,
}

export interface FixedChoice extends Incentive {
  type: 'fixedChoice',
  incentiveValues: IncentiveValues[],
}

export interface Milestone extends Incentive {
  type: 'milestone'
  milestone: MilestoneData
}

export type MilestoneData = {
  raised: number
  goal: number
}

export const isFreeChoice = (incentive: Incentive): incentive is FreeChoice => incentive.type === 'freeChoice'
export const isFixedChoice = (incentive: Incentive): incentive is FixedChoice => incentive.type === 'fixedChoice'
export const isMilestone = (incentive: Incentive): incentive is Milestone => incentive.type === 'milestone'

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
