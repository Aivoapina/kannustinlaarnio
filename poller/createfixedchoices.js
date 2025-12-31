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

async function main() {
  const data = await readFile('./resources/fixedchoices.csv', { encoding: 'utf-8' });
  const lines = data.split('\n');
  lines.forEach(async line => {
    const [id, values] = line.split(';');
    const valuesList = values.split(',');
    valuesList.forEach(async (fixedValue) => {
      const code = await insertIC(id, fixedValue);
      await insertFixedDonation(code);
    })
  })
}

main();
