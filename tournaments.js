const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const language = req.query.lang || 'kz';
    const tournaments = await Tournament.findAll();
    
    // Format for frontend (single language)
    const formattedTournaments = tournaments.map(t => ({
      id: t.id,
      title: t.title[language] || t.title.kz,
      game: t.game,
      category: t.category,
      maxPlayers: t.maxPlayers,
      currentPlayers: t.currentPlayers,
      date: t.date,
      time: t.time,
      whatsappLink: t.whatsappLink,
      rules: t.rules[language] || t.rules.kz,
      requireScreenRecord: t.requireScreenRecord,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    }));
    
    res.json(formattedTournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single tournament
router.get('/:id', async (req, res) => {
  try {
    const language = req.query.lang || 'kz';
    const tournament = await Tournament.findById(req.params.id);
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    // Format for frontend
    const formattedTournament = {
      id: tournament.id,
      title: tournament.title[language] || tournament.title.kz,
      game: tournament.game,
      category: tournament.category,
      maxPlayers: tournament.maxPlayers,
      currentPlayers: tournament.currentPlayers,
      date: tournament.date,
      time: tournament.time,
      whatsappLink: tournament.whatsappLink,
      rules: tournament.rules[language] || tournament.rules.kz,
      requireScreenRecord: tournament.requireScreenRecord,
      status: tournament.status,
      createdAt: tournament.createdAt,
      updatedAt: tournament.updatedAt
    };
    
    res.json(formattedTournament);
  } catch (error) {
    console.error('Error fetching tournament:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get upcoming tournaments
router.get('/upcoming/list', async (req, res) => {
  try {
    const language = req.query.lang || 'kz';
    const tournaments = await Tournament.findUpcoming();
    
    // Format for frontend
    const formattedTournaments = tournaments.map(t => ({
      id: t.id,
      title: t.title[language] || t.title.kz,
      game: t.game,
      category: t.category,
      maxPlayers: t.maxPlayers,
      currentPlayers: t.currentPlayers,
      date: t.date,
      time: t.time,
      whatsappLink: t.whatsappLink,
      rules: t.rules[language] || t.rules.kz,
      requireScreenRecord: t.requireScreenRecord,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    }));
    
    res.json(formattedTournaments);
  } catch (error) {
    console.error('Error fetching upcoming tournaments:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

