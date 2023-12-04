import { NextApiRequest, NextApiResponse } from 'next';
import pool from './db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    if (req.method === 'POST') {
      const { name, sectors } = req.body;

      // Start a transaction
      await client.query('BEGIN');

      const userRes = await client.query(
        'INSERT INTO users(name) VALUES ($1) RETURNING id',
        [name]
      );
      const userId = userRes.rows[0].id;

      for (const sectorId of sectors) {
        await client.query(
          'INSERT INTO user_sectors(user_id, sector_id) VALUES ($1, $2)',
          [userId, sectorId]
        );
      }

      // Commit the transaction
      await client.query('COMMIT');

      res
        .status(201)
        .send({ message: 'User details added successfully', userId });
    } else if (req.method === 'PUT') {
      const { userId, name, sectors } = req.body;

      await client.query('BEGIN');
      await client.query('UPDATE users SET name = $1 WHERE id = $2', [
        name,
        userId,
      ]);
      await client.query('DELETE FROM user_sectors WHERE user_id = $1', [
        userId,
      ]);

      for (const sectorId of sectors) {
        await client.query(
          'INSERT INTO user_sectors(user_id, sector_id) VALUES ($1, $2)',
          [userId, sectorId]
        );
      }

      await client.query('COMMIT');

      res
        .status(200)
        .send({ message: 'User details updated successfully', userId });
    } else if (req.method === 'GET') {
      const userId = req.query.userId;

      const userDetails = await client.query(
        'SELECT * FROM users WHERE id = $1',
        [userId]
      );
      const userSectors = await client.query(
        'SELECT sector_id FROM user_sectors WHERE user_id = $1',
        [userId]
      );

      const userData = {
        ...userDetails.rows[0],
        sectors: userSectors.rows.map((row: any) => row.sector_id),
      };

      res.status(200).json(userData);
    }
    client.release();
  } catch (err) {
    res.status(500).send('Server error');
  }
}
