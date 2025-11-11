import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../Layout';
import RegistrationForm from '../../RegistrationForm';
import axios from 'axios';
import { useTranslation } from '../../lib/translations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function TournamentDetail() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTournament();
    }
  }, [id, locale]);

  const fetchTournament = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tournaments/${id}`, {
        params: { lang: locale }
      });
      setTournament(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tournament:', err);
      setError(err.response?.data?.error || err.message || 'Failed to fetch tournament');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/registrations`, {
        tournamentId: id,
        playerId: formData.playerId,
        playerName: formData.playerName,
        phone: formData.phone,
        email: formData.email,
        screenRecordUrl: formData.screenRecordUrl,
        teamMembers: formData.teamMembers
      });

      if (response.data.success) {
        setRegistered(true);
        setShowRegistration(false);
        if (tournament && tournament.whatsappLink) {
          window.open(tournament.whatsappLink, '_blank');
        }
        alert(locale === 'kz' ? 'Тіркелу сәтті!' : locale === 'ru' ? 'Регистрация успешна!' : 'Registration successful!');
      }
    } catch (err) {
      console.error('Error registering:', err);
      alert(err.response?.data?.error || (locale === 'kz' ? 'Қате пайда болды' : locale === 'ru' ? 'Ошибка' : 'Error'));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className="loading">
            <p>{locale === 'kz' ? 'Жүктелуде...' : locale === 'ru' ? 'Загрузка...' : 'Loading...'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !tournament) {
    return (
      <Layout>
        <div className="container">
          <div className="error">
            <p>{locale === 'kz' ? 'Турнир табылмады' : locale === 'ru' ? 'Турнир не найден' : 'Tournament not found'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const title = tournament.titleObj ? (tournament.titleObj[locale] || tournament.titleObj.kz) : tournament.title;
  const rules = tournament.rulesObj ? (tournament.rulesObj[locale] || tournament.rulesObj.kz) : tournament.rules;

  return (
    <Layout
      seo={{
        title: title,
        description: rules ? rules.substring(0, 160) : title
      }}
    >
      <div className="container">
        <div className="tournament-detail">
          <h1>{title}</h1>
          
          <div className="tournament-info">
            <p><strong>{t('game')}:</strong> {t(tournament.game)}</p>
            <p><strong>{t('category')}:</strong> {t(tournament.category)}</p>
            <p><strong>{t('date')}:</strong> {tournament.date ? new Date(tournament.date).toLocaleDateString(locale === 'kz' ? 'kk-KZ' : locale === 'ru' ? 'ru-RU' : 'en-US') : '-'}</p>
            <p><strong>{t('time')}:</strong> {tournament.time || '-'}</p>
            <p><strong>{t('currentPlayers')}:</strong> {tournament.currentPlayers || 0} / {tournament.maxPlayers || 0}</p>
            <p><strong>{t('status')}:</strong> {tournament.status ? t(tournament.status) : '-'}</p>
          </div>

          <div className="tournament-rules">
            <h2>{locale === 'kz' ? 'Ережелер' : locale === 'ru' ? 'Правила' : 'Rules'}</h2>
            <pre>{rules}</pre>
          </div>

          {!showRegistration && !registered && (
            <div className="tournament-actions">
              <button 
                onClick={() => setShowRegistration(true)}
                className="register-button"
              >
                {t('registerForTournament')}
              </button>
            </div>
          )}

          {showRegistration && !registered && (
            <RegistrationForm
              tournament={tournament}
              onSubmit={handleRegistration}
              onCancel={() => setShowRegistration(false)}
            />
          )}

          {registered && (
            <div className="registered-message">
              <p>{locale === 'kz' ? 'Сіз тіркелдіңіз!' : locale === 'ru' ? 'Вы зарегистрированы!' : 'You are registered!'}</p>
            </div>
          )}
        </div>

        <style jsx>{`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
          }

          .tournament-detail {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          h1 {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }

          .tournament-info {
            margin-bottom: 2rem;
          }

          .tournament-info p {
            margin: 0.5rem 0;
            font-size: 1.1rem;
          }

          .tournament-rules {
            margin-bottom: 2rem;
          }

          .tournament-rules h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          .tournament-rules pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            background: #f5f5f5;
            padding: 1rem;
            border-radius: 4px;
            line-height: 1.6;
          }

          .tournament-actions {
            margin-top: 2rem;
          }

          .register-button {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
          }

          .register-button:hover {
            background: linear-gradient(135deg, #45a049 0%, #388e3c 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
          }

          .registered-message {
            margin-top: 2rem;
            padding: 1rem;
            background: #4CAF50;
            color: white;
            border-radius: 4px;
            text-align: center;
          }

          .loading, .error {
            text-align: center;
            padding: 2rem;
            font-size: 1.25rem;
          }

          .error {
            color: #f44336;
          }
        `}</style>
      </div>
    </Layout>
  );
}

