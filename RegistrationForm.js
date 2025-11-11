import { useState } from 'react';
import { useTranslation } from './lib/translations';

export default function RegistrationForm({ tournament, onSubmit, onCancel }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    playerId: '',
    playerName: '',
    phone: '',
    email: '',
    screenRecordUrl: '',
    teamMembers: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    if (!newTeamMembers[index]) {
      newTeamMembers[index] = { playerId: '', playerName: '' };
    }
    newTeamMembers[index][field] = value;
    setFormData({ ...formData, teamMembers: newTeamMembers });
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h3>{t('registerForTournament')}</h3>

      <div className="form-group">
        <label>{t('gameId')} *</label>
        <input
          type="text"
          value={formData.playerId}
          onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
          required
          placeholder="1234567890"
        />
      </div>

      <div className="form-group">
        <label>{t('playerName')} *</label>
        <input
          type="text"
          value={formData.playerName}
          onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>{t('phone')} *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          placeholder="+7 700 123 4567"
        />
      </div>

      <div className="form-group">
        <label>{t('email')}</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@email.com"
        />
      </div>

      {tournament.requireScreenRecord && (
        <div className="form-group">
          <label>{t('screenRecord')} *</label>
          <input
            type="url"
            value={formData.screenRecordUrl}
            onChange={(e) => setFormData({ ...formData, screenRecordUrl: e.target.value })}
            placeholder={t('screenRecordPlaceholder')}
            required
          />
          <small>{t('screenRecordNote')}</small>
        </div>
      )}

      {tournament.category === 'duo' && (
        <div className="form-group">
          <label>{t('teammateId')} *</label>
          <input
            type="text"
            value={formData.teamMembers[0]?.playerId || ''}
            onChange={(e) => handleTeamMemberChange(0, 'playerId', e.target.value)}
            required
            placeholder="1234567890"
          />
          <input
            type="text"
            value={formData.teamMembers[0]?.playerName || ''}
            onChange={(e) => handleTeamMemberChange(0, 'playerName', e.target.value)}
            required
            placeholder={t('playerName')}
            style={{ marginTop: '0.5rem' }}
          />
        </div>
      )}

      {tournament.category === 'squad' && (
        <div className="form-group">
          <label>{t('teammates')} (3 {t('players')}) *</label>
          {[0, 1, 2].map((index) => {
            const teammateKey = `teammate${index + 1}`;
            return (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={formData.teamMembers[index]?.playerId || ''}
                  onChange={(e) => handleTeamMemberChange(index, 'playerId', e.target.value)}
                  required
                  placeholder={`${t(teammateKey)} ID`}
                  style={{ marginBottom: '0.25rem' }}
                />
                <input
                  type="text"
                  value={formData.teamMembers[index]?.playerName || ''}
                  onChange={(e) => handleTeamMemberChange(index, 'playerName', e.target.value)}
                  required
                  placeholder={`${t(teammateKey)} ${t('playerName')}`}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="submit-button">{t('register')}</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-button">
            {t('cancel')}
          </button>
        )}
      </div>

      <style jsx>{`
        .registration-form {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group small {
          display: block;
          margin-top: 0.5rem;
          color: #666;
          font-size: 0.875rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .submit-button {
          padding: 0.75rem 2rem;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .submit-button:hover {
          background: #45a049;
        }

        .cancel-button {
          padding: 0.75rem 2rem;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .cancel-button:hover {
          background: #da190b;
        }
      `}</style>
    </form>
  );
}

