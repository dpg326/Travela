const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { isAuthenticated } = require('../middleware/auth');

// Get comments for a trip
router.get('/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;

    const result = await pool.query(`
      SELECT c.*, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.trip_id = $1
      ORDER BY c.created_at DESC
    `, [tripId]);

    res.json({ comments: result.rows });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create comment (authenticated)
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { trip_id, content } = req.body;

    if (!trip_id || !content) {
      return res.status(400).json({ error: 'Trip ID and content are required' });
    }

    // Check if trip exists
    const tripCheck = await pool.query('SELECT id FROM trips WHERE id = $1', [trip_id]);
    if (tripCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    const result = await pool.query(`
      INSERT INTO comments (trip_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [trip_id, req.session.userId, content]);

    // Get username for response
    const comment = await pool.query(`
      SELECT c.*, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = $1
    `, [result.rows[0].id]);

    res.status(201).json({
      message: 'Comment created successfully',
      comment: comment.rows[0]
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete comment (authenticated, owner only)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if comment exists and user is owner
    const commentCheck = await pool.query('SELECT user_id FROM comments WHERE id = $1', [id]);
    
    if (commentCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (commentCheck.rows[0].user_id !== req.session.userId && req.session.role !== 'admin') {
      return res.status(403).json({ error: 'You can only delete your own comments' });
    }

    await pool.query('DELETE FROM comments WHERE id = $1', [id]);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
