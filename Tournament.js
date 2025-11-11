const { pool } = require('../database');

class Tournament {
  static async findAll() {
    const result = await pool.query(`
      SELECT 
        t.*,
        COALESCE(COUNT(r.id) FILTER (WHERE r.status = 'approved'), 0)::INTEGER as current_players
      FROM tournaments t
      LEFT JOIN registrations r ON t.id = r.tournament_id
      WHERE t.status != 'deleted'
      GROUP BY t.id
      ORDER BY t.date ASC, t.created_at DESC
    `);
    return result.rows.map(this.mapRowToTournament);
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT 
        t.*,
        COALESCE(COUNT(r.id) FILTER (WHERE r.status = 'approved'), 0)::INTEGER as current_players
      FROM tournaments t
      LEFT JOIN registrations r ON t.id = r.tournament_id
      WHERE t.id = $1 AND t.status != 'deleted'
      GROUP BY t.id
    `, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToTournament(result.rows[0]);
  }

  static async findUpcoming() {
    const result = await pool.query(`
      SELECT 
        t.*,
        COALESCE(COUNT(r.id) FILTER (WHERE r.status = 'approved'), 0)::INTEGER as current_players
      FROM tournaments t
      LEFT JOIN registrations r ON t.id = r.tournament_id
      WHERE t.status IN ('upcoming', 'registration') 
        AND t.date >= CURRENT_DATE
        AND t.status != 'deleted'
      GROUP BY t.id
      ORDER BY t.date ASC
    `);
    return result.rows.map(this.mapRowToTournament);
  }

  static async create(data) {
    const {
      title_kz,
      title_ru,
      game,
      category,
      max_players,
      date,
      time,
      whatsapp_link,
      rules_kz,
      rules_ru,
      require_screen_record = true,
      status = 'registration'
    } = data;

    const result = await pool.query(`
      INSERT INTO tournaments (
        title_kz, title_ru, game, category, max_players,
        date, time, whatsapp_link, rules_kz, rules_ru,
        require_screen_record, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      title_kz, title_ru, game, category, max_players,
      date, time, whatsapp_link || null, rules_kz, rules_ru,
      require_screen_record, status
    ]);

    return this.mapRowToTournament(result.rows[0]);
  }

  static async update(id, data) {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (data.title_kz !== undefined) {
      updates.push(`title_kz = $${paramCount++}`);
      values.push(data.title_kz);
    }
    if (data.title_ru !== undefined) {
      updates.push(`title_ru = $${paramCount++}`);
      values.push(data.title_ru);
    }
    if (data.game !== undefined) {
      updates.push(`game = $${paramCount++}`);
      values.push(data.game);
    }
    if (data.category !== undefined) {
      updates.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.max_players !== undefined) {
      updates.push(`max_players = $${paramCount++}`);
      values.push(data.max_players);
    }
    if (data.date !== undefined) {
      updates.push(`date = $${paramCount++}`);
      values.push(data.date);
    }
    if (data.time !== undefined) {
      updates.push(`time = $${paramCount++}`);
      values.push(data.time);
    }
    if (data.whatsapp_link !== undefined) {
      updates.push(`whatsapp_link = $${paramCount++}`);
      values.push(data.whatsapp_link);
    }
    if (data.rules_kz !== undefined) {
      updates.push(`rules_kz = $${paramCount++}`);
      values.push(data.rules_kz);
    }
    if (data.rules_ru !== undefined) {
      updates.push(`rules_ru = $${paramCount++}`);
      values.push(data.rules_ru);
    }
    if (data.require_screen_record !== undefined) {
      updates.push(`require_screen_record = $${paramCount++}`);
      values.push(data.require_screen_record);
    }
    if (data.status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(data.status);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(`
      UPDATE tournaments
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToTournament(result.rows[0]);
  }

  static async delete(id) {
    // Get tournament data before deleting
    const tournament = await this.findById(id);
    if (!tournament) {
      return null;
    }

    // Get all registrations for this tournament
    const registrationsResult = await pool.query(`
      SELECT * FROM registrations WHERE tournament_id = $1
    `, [id]);

    // Move to history
    await pool.query(`
      INSERT INTO tournament_history (
        tournament_id, title_kz, title_ru, game, category,
        max_players, date, time, whatsapp_link, rules_kz, rules_ru, players_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `, [
      tournament.id,
      tournament.title.kz,
      tournament.title.ru,
      tournament.game,
      tournament.category,
      tournament.maxPlayers,
      tournament.date,
      tournament.time,
      tournament.whatsappLink,
      tournament.rules.kz,
      tournament.rules.ru,
      JSON.stringify(registrationsResult.rows)
    ]);

    // Mark as deleted instead of actually deleting
    const result = await pool.query(`
      UPDATE tournaments
      SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [id]);

    return result.rows[0] ? this.mapRowToTournament(result.rows[0]) : null;
  }

  static async getHistory() {
    const result = await pool.query(`
      SELECT * FROM tournament_history
      ORDER BY deleted_at DESC
    `);
    return result.rows.map(this.mapHistoryRowToTournament);
  }

  static mapRowToTournament(row) {
    return {
      id: row.id,
      title: {
        kz: row.title_kz,
        ru: row.title_ru
      },
      game: row.game,
      category: row.category,
      maxPlayers: parseInt(row.max_players),
      currentPlayers: parseInt(row.current_players || 0),
      date: row.date,
      time: row.time,
      whatsappLink: row.whatsapp_link || '',
      rules: {
        kz: row.rules_kz,
        ru: row.rules_ru
      },
      requireScreenRecord: row.require_screen_record,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at
    };
  }

  static mapHistoryRowToTournament(row) {
    return {
      id: row.id,
      tournamentId: row.tournament_id,
      title: {
        kz: row.title_kz,
        ru: row.title_ru
      },
      game: row.game,
      category: row.category,
      maxPlayers: parseInt(row.max_players),
      date: row.date,
      time: row.time,
      whatsappLink: row.whatsapp_link || '',
      rules: {
        kz: row.rules_kz,
        ru: row.rules_ru
      },
      playersData: row.players_data,
      deletedAt: row.deleted_at
    };
  }
}

module.exports = Tournament;
