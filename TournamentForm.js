import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function TournamentForm({ onSubmit, onCancel }) {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    title: { kz: '', ru: '', en: '' },
    game: 'freefire',
    category: 'solo',
    date: '',
    time: '',
    rules: { kz: '', ru: '', en: '' },
    whatsappLink: '',
    requireScreenRecord: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="tournament-form">
      <h2>{t('newTournament')}</h2>

      <div className="form-group">
        <label>{t('titleKazakh')} *</label>
        <input
          type="text"
          value={formData.title.kz}
          onChange={(e) => setFormData({
            ...formData,
            title: { ...formData.title, kz: e.target.value }
          })}
          required
        />
      </div>

      <div className="form-group">
        <label>{t('titleRussian')} *</label>
        <input
          type="text"
          value={formData.title.ru}
          onChange={(e) => setFormData({
            ...formData,
            title: { ...formData.title, ru: e.target.value }
          })}
          required
        />
      </div>

      <div className="form-group">
        <label>{t('titleEnglish')} *</label>
        <input
          type="text"
          value={formData.title.en}
          onChange={(e) => setFormData({
            ...formData,
            title: { ...formData.title, en: e.target.value }
          })}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>{t('game')} *</label>
          <select
            value={formData.game}
            onChange={(e) => setFormData({ ...formData, game: e.target.value })}
            required
          >
            <option value="freefire">{t('freefire')}</option>
            <option value="pubg">{t('pubg')}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{t('category')} *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="solo">{t('solo')}</option>
            <option value="duo">{t('duo')}</option>
            <option value="squad">{t('squad')}</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>{t('date')} *</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('time')} *</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>{t('whatsappGroupLink')} *</label>
        <input
          type="url"
          value={formData.whatsappLink}
          onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
          placeholder="https://chat.whatsapp.com/..."
          required
        />
      </div>

      <div className="form-group">
        <label>{t('rulesKazakh')} *</label>
        <textarea
          value={formData.rules.kz}
          onChange={(e) => setFormData({
            ...formData,
            rules: { ...formData.rules, kz: e.target.value }
          })}
          rows="5"
          required
          placeholder="Ережелерді енгізіңіз..."
        />
      </div>

      <div className="form-group">
        <label>{t('rulesRussian')} *</label>
        <textarea
          value={formData.rules.ru}
          onChange={(e) => setFormData({
            ...formData,
            rules: { ...formData.rules, ru: e.target.value }
          })}
          rows="5"
          required
          placeholder="Введите правила..."
        />
      </div>

      <div className="form-group">
        <label>{t('rulesEnglish')} *</label>
        <textarea
          value={formData.rules.en}
          onChange={(e) => setFormData({
            ...formData,
            rules: { ...formData.rules, en: e.target.value }
          })}
          rows="5"
          required
          placeholder="Enter rules..."
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.requireScreenRecord}
            onChange={(e) => setFormData({ ...formData, requireScreenRecord: e.target.checked })}
          />
          {' '}{t('screenRecord')} {t('required')}
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">{t('create')}</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-button">
            {t('cancel')}
          </button>
        )}
      </div>

      <style jsx>{`
        .tournament-form {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group textarea {
          resize: vertical;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
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

