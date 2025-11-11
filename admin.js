const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');

// Simple admin password check (can be improved with JWT later)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'нуарли07';

const checkAdmin = (req, res, next) => {
  const password = req.headers['x-admin-password'] || req.body.password;
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Tournament player limits
const MAX_PLAYERS = {
  freefire: {
    solo: 50,
    duo: 50,    // 25 teams
    squad: 52   // 13 teams
  },
  pubg: {
    solo: 100,
    duo: 100,   // 50 teams
    squad: 100  // 25 teams
  }
};

// Create tournament
router.post('/tournaments', checkAdmin, async (req, res) => {
  try {
    const { title, title_kz, title_ru, game, category, date, time, rules, rules_kz, rules_ru, whatsappLink, maxPlayers } = req.body;
    
    // Handle both formats (object or separate fields)
    const titleKz = title_kz || title?.kz || title;
    const titleRu = title_ru || title?.ru || title;
    const rulesKz = rules_kz || rules?.kz || rules;
    const rulesRu = rules_ru || rules?.ru || rules;
    
    // Validate required fields
    if (!titleKz || !titleRu) {
      return res.status(400).json({ error: 'Title in both languages is required' });
    }
    
    if (!game || !['freefire', 'pubg'].includes(game)) {
      return res.status(400).json({ error: 'Invalid game' });
    }
    
    if (!category || !['solo', 'duo', 'squad'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    if (!date || !time) {
      return res.status(400).json({ error: 'Date and time are required' });
    }
    
    if (!rulesKz || !rulesRu) {
      return res.status(400).json({ error: 'Rules in both languages are required' });
    }
    
    // Get max players based on game and category or use provided value
    const maxPlayersCount = maxPlayers || MAX_PLAYERS[game]?.[category] || 50;
    
    // Create tournament
    const tournament = await Tournament.create({
      title_kz: titleKz,
      title_ru: titleRu,
      game,
      category,
      max_players: maxPlayersCount,
      date,
      time,
      whatsapp_link: whatsappLink || '',
      rules_kz: rulesKz,
      rules_ru: rulesRu,
      require_screen_record: true,
      status: 'registration'
    });
    
    res.json({
      success: true,
      tournament
    });
  } catch (error) {
    console.error('Error creating tournament:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all tournaments (admin view)
router.get('/tournaments', checkAdmin, async (req, res) => {
  try {
    const language = req.query.lang || 'kz';
    const tournaments = await Tournament.findAll();
    
    // Format for admin view
    const formattedTournaments = tournaments.map(t => ({
      id: t.id,
      title: {
        kz: t.title.kz,
        ru: t.title.ru
      },
      titleText: t.title[language] || t.title.kz,
      game: t.game,
      category: t.category,
      maxPlayers: t.maxPlayers,
      currentPlayers: t.currentPlayers,
      date: t.date,
      time: t.time,
      whatsappLink: t.whatsappLink,
      rules: {
        kz: t.rules.kz,
        ru: t.rules.ru
      },
      requireScreenRecord: t.requireScreenRecord,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    }));
    
    res.json(formattedTournaments);
  } catch (error) {
    console.error('Error fetching admin tournaments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update tournament
router.put('/tournaments/:id', checkAdmin, async (req, res) => {
  try {
    const { title, title_kz, title_ru, game, category, date, time, rules, rules_kz, rules_ru, whatsappLink, requireScreenRecord, status, maxPlayers } = req.body;
    
    const updateData = {};
    
    if (title_kz || title?.kz) updateData.title_kz = title_kz || title.kz;
    if (title_ru || title?.ru) updateData.title_ru = title_ru || title.ru;
    if (game) updateData.game = game;
    if (category) updateData.category = category;
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (rules_kz || rules?.kz) updateData.rules_kz = rules_kz || rules.kz;
    if (rules_ru || rules?.ru) updateData.rules_ru = rules_ru || rules.ru;
    if (whatsappLink !== undefined) updateData.whatsapp_link = whatsappLink;
    if (requireScreenRecord !== undefined) updateData.require_screen_record = requireScreenRecord;
    if (status) updateData.status = status;
    if (maxPlayers) updateData.max_players = maxPlayers;
    
    // Update max players if game or category changed
    if (game || category) {
      const tournament = await Tournament.findById(req.params.id);
      if (tournament) {
        const finalGame = game || tournament.game;
        const finalCategory = category || tournament.category;
        updateData.max_players = maxPlayers || MAX_PLAYERS[finalGame]?.[finalCategory] || 50;
      }
    }
    
    const tournament = await Tournament.update(req.params.id, updateData);
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    res.json({
      success: true,
      tournament
    });
  } catch (error) {
    console.error('Error updating tournament:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete tournament
router.delete('/tournaments/:id', checkAdmin, async (req, res) => {
  try {
    const tournament = await Tournament.delete(req.params.id);
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    res.json({
      success: true,
      message: 'Tournament deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tournament:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get tournament history
router.get('/tournaments/history', checkAdmin, async (req, res) => {
  try {
    const history = await Tournament.getHistory();
    res.json(history);
  } catch (error) {
    console.error('Error fetching tournament history:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get registrations for tournament
router.get('/tournaments/:id/registrations', checkAdmin, async (req, res) => {
  try {
    const registrations = await Registration.findByTournamentId(req.params.id);
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add player to tournament
router.post('/tournaments/:id/players', checkAdmin, async (req, res) => {
  try {
    const { playerId, playerName, phone, email } = req.body;
    
    if (!playerId) {
      return res.status(400).json({ error: 'Player ID is required' });
    }
    
    // Check if tournament exists
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    // Check if player already registered
    const existing = await Registration.findByTournamentAndPlayer(req.params.id, playerId);
    if (existing) {
      return res.status(400).json({ error: 'Player already registered' });
    }
    
    // Check if tournament is full
    const currentCount = await Registration.countByTournamentId(req.params.id, 'approved');
    if (currentCount >= tournament.maxPlayers) {
      return res.status(400).json({ error: 'Tournament is full' });
    }
    
    // Create registration
    const registration = await Registration.create({
      tournament_id: req.params.id,
      player_id: playerId,
      player_name: playerName,
      phone: phone,
      email: email,
      status: 'approved'
    });
    
    res.json({
      success: true,
      registration
    });
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ error: error.message });
  }
});

// Remove player from tournament
router.delete('/tournaments/:id/players/:playerId', checkAdmin, async (req, res) => {
  try {
    const registration = await Registration.deleteByTournamentAndPlayer(req.params.id, req.params.playerId);
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({
      success: true,
      message: 'Player removed successfully'
    });
  } catch (error) {
    console.error('Error removing player:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update registration status
router.put('/registrations/:id', checkAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const registration = await Registration.update(req.params.id, { status });
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({
      success: true,
      registration
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

