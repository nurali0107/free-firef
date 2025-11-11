const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');

// Register for tournament
router.post('/', async (req, res) => {
  try {
    const { tournamentId, playerId, playerName, phone, email } = req.body;
    
    if (!tournamentId || !playerId) {
      return res.status(400).json({ error: 'Tournament ID and Player ID are required' });
    }
    
    // Check if tournament exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    // Check if tournament is open for registration
    if (tournament.status !== 'registration' && tournament.status !== 'upcoming') {
      return res.status(400).json({ error: 'Tournament is not open for registration' });
    }
    
    // Check if player already registered
    const existing = await Registration.findByTournamentAndPlayer(tournamentId, playerId);
    if (existing) {
      return res.status(400).json({ error: 'Player already registered' });
    }
    
    // Check if tournament is full
    const currentCount = await Registration.countByTournamentId(tournamentId, 'approved');
    if (currentCount >= tournament.maxPlayers) {
      return res.status(400).json({ error: 'Tournament is full' });
    }
    
    // Create registration
    const registration = await Registration.create({
      tournament_id: tournamentId,
      player_id: playerId,
      player_name: playerName,
      phone: phone,
      email: email,
      status: 'approved'
    });
    
    res.json({
      success: true,
      registration,
      tournament: {
        id: tournament.id,
        title: tournament.title,
        whatsappLink: tournament.whatsappLink
      }
    });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check if player is registered
router.get('/check', async (req, res) => {
  try {
    const { tournamentId, playerId } = req.query;
    
    if (!tournamentId || !playerId) {
      return res.status(400).json({ error: 'Tournament ID and Player ID are required' });
    }
    
    const registration = await Registration.findByTournamentAndPlayer(tournamentId, playerId);
    
    res.json({
      registered: !!registration,
      registration: registration || null
    });
  } catch (error) {
    console.error('Error checking registration:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
