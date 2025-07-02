import { Client } from 'pg';
import { IncentiveCode } from '../types/types';

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? ''),
  database: process.env.DATABASE_NAME,
}

const client = new Client(config);
await client.connect();

export const getAllIncentives = async () => {
  // this is not the best way but I don't want to learn the better way :D
  const query = 'SELECT i.*, SUM(d.amount), ic.inc_value FROM Incentives as i, IncentiveCodes as ic, Donations as d WHERE i.id = ic.incentive_id and d.incentive_code = ic.id group by i.id, ic.inc_value';
  const incQuery = 'SELECT * from Incentives';
  const res = await client.query(query);
  const incRes = await client.query(incQuery);
  const ids = res.rows.map(i => i.id);
  const noDonoIncs = incRes.rows.filter(inc => !ids.includes(inc.id));
  return [...res.rows, ...noDonoIncs];
}

export const insertIncentiveCode = async (incentiveCode: IncentiveCode) => {
  const query = 'INSERT INTO IncentiveCodes values ($1, $2, $3)';
  const values = [ incentiveCode.id, incentiveCode.incentiveId, incentiveCode.value ];
  await client.query(query, values);
}

export const checkIfIncentiveCodeExists = async (id: string): Promise<boolean> => {
  const query = 'SELECT ID from IncentiveCodes WHERE id=$1';
  const values = [ id ];
  const res = await client.query(query, values);
  return res.rowCount !== 0;
}

export const getDonations = async () => {
  const query = 'SELECT d.id, d.donator, d.msg, d.amount, ic.inc_value, i.game, i.title FROM Donations as d LEFT JOIN IncentiveCodes as ic ON d.incentive_code = ic.id LEFT JOIN Incentives as i ON ic.incentive_id = i.id';
  const res = await client.query(query);
  return res.rows;
}

export const getAdminIncentives = async () => {
  const query = 'SELECT i.id, i.title, i.game, i.endtime from Incentives as i;';
  const res = await client.query(query);
  return res.rows;
}

export const closeIncentive = async (id: string) => {
  const now = new Date().toISOString();
  const query = 'UPDATE Incentives SET endtime = $1 WHERE id = $2';
  const values = [ now, id ];
  await client.query(query, values);
}
