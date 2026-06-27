import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { readFile } from 'node:fs/promises';

dotenv.config({ path: '../.env' });

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? ''),
  database: process.env.DATABASE_NAME,
}

const client = new Client(config);
client.connect();

const INCENTIVE_CODE_LENGTH = 8;
const generateIncentiveCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < INCENTIVE_CODE_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const insertIC = async (id, fixedValue) => {
  const code = generateIncentiveCode();
  const query = 'INSERT INTO incentivecodes VALUES ($1, $2, $3)';
  const icValues = [code, id, fixedValue];
  await client.query(query, icValues);
  return code;
}

let fixedIndex = 1;

const insertFixedDonation = async (code) => {
  const query = 'INSERT INTO Donations VALUES ($1, $2, $3, $4, $5)';
  fixedIndex += 1;
  const values = [`fixed${fixedIndex}`, '', 0, '', code];
  await client.query(query, values);
}

const insertIncentive = async (values) => {
  const query = 'INSERT INTO Incentives(game, title, info, incentive_type, endtime, incentive_pattern, milestone_amount ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
  const result = await client.query(query, values);
  return result.rows[0].id;
}

async function main() {
  const data = await readFile('./resources/incentives.csv', { encoding: 'utf-8' });
  const lines = data.split('\n');
  lines.forEach(async line => {
    const [game, title, info, incentive_type, endtime, fixed_choices, incentive_pattern, milestone_amount] = line.split(';');
    const id = await insertIncentive([game, title, info, incentive_type, endtime, incentive_pattern || null, milestone_amount || null]);
    if (incentive_type === 'fixedChoice') {
      const fixedChoicesList = fixed_choices.split(',');
      fixedChoicesList.forEach(async (fixedValue) => {
        const code = await insertIC(id, fixedValue);
        await insertFixedDonation(code);
      })
    }
  })
}

main();
