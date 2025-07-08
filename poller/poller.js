import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const DONATE_URL = process.env.DONATE_URL;

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? ''),
  database: process.env.DATABASE_NAME,
}

const client = new Client(config);
client.connect();

setInterval(async () => {
  const data = await fetchJson(DONATE_URL);
  if (!data) return;

  const donates = data.data.map((donate) => {
    const { id, amount, message, name } = donate;
    return {
      id,
      amount,
      message,
      name,
      code: getIncentiveCode(message)
    }
  });

  const promises = donates.map((don) => {
    insertIntoDB(don)
  });
  await Promise.all(promises);
}, 20000)

const insertIntoDB = async (value) => {
  let query = 'INSERT INTO Donations VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET donator=$2, msg=$4, incentive_code=$5';
  if (!value.message) {
    query = 'INSERT INTO Donations VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET donator=$2';
  }
  const values = [ value.id, value.name, value.amount, value.message, value.code ]
  await client.query(query, values);
}

const fetchJson = async (url) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Locale": "fi",
    "X-Site-Id": "Dp9tjHj3gsVn"
  };
  try {
    const res = await fetch(url, { headers });
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getIncentiveCode = (message) => {
  if (!message) return;
  const reg = new RegExp('\\[[a-zA-Z\\d]{8}\\]', 'g');
  const result = message.match(reg);

  if (result && result.length > 0) {
    return result[0].slice(1, 9);
  }
  return null;
}
