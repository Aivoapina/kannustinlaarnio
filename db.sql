CREATE TABLE IF NOT EXISTS Donations (
  ID varchar(32) primary key,
  donator text,
  amount real,
  msg text,
  incentive_code varchar(8)
);

CREATE TABLE IF NOT EXISTS Incentives (
  ID serial primary key,
  game text,
  title text,
  info text,
  incentive_type text,
  endtime text,
  milestone_amount real
);

CREATE TABLE IF NOT EXISTS IncentiveCodes (
  ID varchar(8) primary key,
  incentive_id integer,
  inc_value text
);
