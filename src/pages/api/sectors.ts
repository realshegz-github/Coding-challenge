import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    if (req.method === 'GET') {
      const { rows } = await client.query('SELECT * FROM sectors');
      res.status(200).json(rows);
    }
    client.release();
  } catch (err) {
    res.status(500).send('Server error');
  }
}
