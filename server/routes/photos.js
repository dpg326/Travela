const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { isAuthenticated } = require('../middleware/auth');

// Get photos for a trip
router.get('/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;

    const result = await pool.query(`
      SELECT * FROM photos
      WHERE trip_id = $1
      ORDER BY created_at
    `, [tripId]);

    res.json({ photos: result.rows });
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add photo to trip (authenticated)
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { trip_id, photo_url, caption } = req.body;

    if (!trip_id || !photo_url) {
      return res.status(400).json({ error: 'Trip ID and photo URL are required' });
    }

    // Check if trip exists and user is owner
    const tripCheck = await pool.query('SELECT user_id FROM trips WHERE id = $1', [trip_id]);
    
    if (tripCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (tripCheck.rows[0].user_id !== req.session.userId) {
      return res.status(403).json({ error: 'You can only add photos to your own trips' });
    }

    const result = await pool.query(`
      INSERT INTO photos (trip_id, photo_url, caption)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [trip_id, photo_url, caption]);

    res.status(201).json({
      message: 'Photo added successfully',
      photo: result.rows[0]
    });
  } catch (error) {
    console.error('Add photo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete photo (authenticated, owner only)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if photo exists and user owns the trip
    const photoCheck = await pool.query(`
      SELECT p.*, t.user_id
      FROM photos p
      JOIN trips t ON p.trip_id = t.id
      WHERE p.id = $1
    `, [id]);
    
    if (photoCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    if (photoCheck.rows[0].user_id !== req.session.userId && req.session.role !== 'admin') {
      return res.status(403).json({ error: 'You can only delete photos from your own trips' });
    }

    await pool.query('DELETE FROM photos WHERE id = $1', [id]);

    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
