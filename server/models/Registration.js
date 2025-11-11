const { pool } = require('../database');

class Registration {
  static checkDatabase() {
    if (!pool) {
      throw new Error('Database is not configured. Please set DATABASE_URL in .env file');
    }
  }

  static async findByTournamentId(tournamentId) {
    this.checkDatabase();
    const result = await pool.query(`
      SELECT * FROM registrations
      WHERE tournament_id = $1
      ORDER BY registered_at DESC
    `, [tournamentId]);
    return result.rows.map(this.mapRowToRegistration);
  }

  static async findByTournamentAndPlayer(tournamentId, playerId) {
    this.checkDatabase();
    const result = await pool.query(`
      SELECT * FROM registrations
      WHERE tournament_id = $1 AND player_id = $2
    `, [tournamentId, playerId]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToRegistration(result.rows[0]);
  }

  static async countByTournamentId(tournamentId, status = 'approved') {
    this.checkDatabase();
    const result = await pool.query(`
      SELECT COUNT(*) as count
      FROM registrations
      WHERE tournament_id = $1 AND status = $2
    `, [tournamentId, status]);
    return parseInt(result.rows[0].count);
  }

  static async create(data) {
    this.checkDatabase();
    const {
      tournament_id,
      player_id,
      player_name,
      phone,
      email,
      screen_record_url,
      team_members,
      status = 'approved'
    } = data;

    const result = await pool.query(`
      INSERT INTO registrations (
        tournament_id, player_id, player_name, phone, email,
        screen_record_url, team_members, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
      tournament_id,
      player_id,
      player_name || null,
      phone || null,
      email || null,
      screen_record_url || null,
      team_members ? JSON.stringify(team_members) : null,
      status
    ]);

    return this.mapRowToRegistration(result.rows[0]);
  }

  static async update(id, data) {
    this.checkDatabase();
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (data.player_name !== undefined) {
      updates.push(`player_name = $${paramCount++}`);
      values.push(data.player_name);
    }
    if (data.phone !== undefined) {
      updates.push(`phone = $${paramCount++}`);
      values.push(data.phone);
    }
    if (data.email !== undefined) {
      updates.push(`email = $${paramCount++}`);
      values.push(data.email);
    }
    if (data.screen_record_url !== undefined) {
      updates.push(`screen_record_url = $${paramCount++}`);
      values.push(data.screen_record_url);
    }
    if (data.team_members !== undefined) {
      updates.push(`team_members = $${paramCount++}`);
      values.push(JSON.stringify(data.team_members));
    }
    if (data.status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(data.status);
    }

    values.push(id);

    const result = await pool.query(`
      UPDATE registrations
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToRegistration(result.rows[0]);
  }

  static async delete(id) {
    this.checkDatabase();
    const result = await pool.query(`
      DELETE FROM registrations
      WHERE id = $1
      RETURNING *
    `, [id]);
    
    return result.rows[0] ? this.mapRowToRegistration(result.rows[0]) : null;
  }

  static async deleteByTournamentAndPlayer(tournamentId, playerId) {
    this.checkDatabase();
    const result = await pool.query(`
      DELETE FROM registrations
      WHERE tournament_id = $1 AND player_id = $2
      RETURNING *
    `, [tournamentId, playerId]);
    
    return result.rows[0] ? this.mapRowToRegistration(result.rows[0]) : null;
  }

  static mapRowToRegistration(row) {
    return {
      id: row.id,
      tournamentId: row.tournament_id,
      playerId: row.player_id,
      playerName: row.player_name,
      phone: row.phone,
      email: row.email,
      screenRecordUrl: row.screen_record_url,
      teamMembers: row.team_members ? (typeof row.team_members === 'string' ? JSON.parse(row.team_members) : row.team_members) : [],
      status: row.status,
      registeredAt: row.registered_at
    };
  }
}

module.exports = Registration;

