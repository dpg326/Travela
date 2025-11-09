const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { isAuthenticated } = require('../middleware/auth');

// Get all public trips
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, u.username, 
        (SELECT COUNT(*) FROM comments WHERE trip_id = t.id) as comment_count,
        (SELECT COUNT(*) FROM likes WHERE trip_id = t.id) as like_count
      FROM trips t
      JOIN users u ON t.user_id = u.id
      WHERE t.is_public = true
      ORDER BY t.created_at DESC
    `);

    res.json({ trips: result.rows });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get trip by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT t.*, u.username,
        (SELECT COUNT(*) FROM comments WHERE trip_id = t.id) as comment_count,
        (SELECT COUNT(*) FROM likes WHERE trip_id = t.id) as like_count
      FROM trips t
      JOIN users u ON t.user_id = u.id
      WHERE t.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const trip = result.rows[0];

    // Check if trip is public or user is owner
    if (!trip.is_public && (!req.session.userId || req.session.userId !== trip.user_id)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get photos for this trip
    const photos = await pool.query(
      'SELECT * FROM photos WHERE trip_id = $1 ORDER BY created_at',
      [id]
    );

    res.json({ 
      trip: trip,
      photos: photos.rows
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new trip (authenticated)
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, destination, description, start_date, end_date, latitude, longitude, is_public } = req.body;

    // Validate required fields
    if (!title || !destination) {
      return res.status(400).json({ error: 'Title and destination are required' });
    }

    const result = await pool.query(`
      INSERT INTO trips (user_id, title, destination, description, start_date, end_date, latitude, longitude, is_public)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [req.session.userId, title, destination, description, start_date, end_date, latitude, longitude, is_public !== false]);

    res.status(201).json({
      message: 'Trip created successfully',
      trip: result.rows[0]
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update trip (authenticated, owner only)
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, destination, description, start_date, end_date, latitude, longitude, is_public } = req.body;

    // Check if trip exists and user is owner
    const tripCheck = await pool.query('SELECT user_id FROM trips WHERE id = $1', [id]);
    
    if (tripCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (tripCheck.rows[0].user_id !== req.session.userId) {
      return res.status(403).json({ error: 'You can only edit your own trips' });
    }

    const result = await pool.query(`
      UPDATE trips 
      SET title = COALESCE($1, title),
          destination = COALESCE($2, destination),
          description = COALESCE($3, description),
          start_date = COALESCE($4, start_date),
          end_date = COALESCE($5, end_date),
          latitude = COALESCE($6, latitude),
          longitude = COALESCE($7, longitude),
          is_public = COALESCE($8, is_public),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `, [title, destination, description, start_date, end_date, latitude, longitude, is_public, id]);

    res.json({
      message: 'Trip updated successfully',
      trip: result.rows[0]
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete trip (authenticated, owner only)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if trip exists and user is owner
    const tripCheck = await pool.query('SELECT user_id FROM trips WHERE id = $1', [id]);
    
    if (tripCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (tripCheck.rows[0].user_id !== req.session.userId && req.session.role !== 'admin') {
      return res.status(403).json({ error: 'You can only delete your own trips' });
    }

    await pool.query('DELETE FROM trips WHERE id = $1', [id]);

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
