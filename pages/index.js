import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../Layout';
import TournamentCard from '../TournamentCard';
import axios from 'axios';
import { useTranslation } from '../lib/translations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTournaments();
  }, [locale]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tournaments/upcoming/list`, {
        params: { lang: locale }
      });
      setTournaments(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError(err.response?.data?.error || err.message || 'Failed to fetch tournaments');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      seo={{
        title: t('title'),
        description: locale === 'kz' 
          ? 'Free Fire және PUBG ойындарына арналған турнирлер платформасы. Соло, Дуо және Отряд режимдерінде турнирлерге қатысыңыз.'
          : locale === 'ru'
          ? 'Платформа для турниров по играм Free Fire и PUBG. Участвуйте в турнирах в режимах Соло, Дуо и Отряд.'
          : 'Tournament platform for Free Fire and PUBG games. Participate in tournaments in Solo, Duo and Squad modes.'
      }}
    >
      <div className="container">
        <div className="hero">
          <h1>{t('title')}</h1>
          <p>
            {locale === 'kz' 
              ? 'Free Fire және PUBG ойындарына арналған турнирлер платформасы. Соло, Дуо және Отряд режимдерінде турнирлерге қатысыңыз.'
              : locale === 'ru'
              ? 'Платформа для турниров по играм Free Fire и PUBG. Участвуйте в турнирах в режимах Соло, Дуо и Отряд.'
              : 'Tournament platform for Free Fire and PUBG games. Participate in tournaments in Solo, Duo and Squad modes.'}
          </p>
        </div>

        {loading && (
          <div className="loading">
            <p>{locale === 'kz' ? 'Жүктелуде...' : locale === 'ru' ? 'Загрузка...' : 'Loading...'}</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{locale === 'kz' ? 'Қате пайда болды: ' : locale === 'ru' ? 'Ошибка: ' : 'Error: '}{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="tournaments-section">
            <h2>{t('tournaments')}</h2>
            {tournaments.length === 0 ? (
              <p>{locale === 'kz' ? 'Турнирлер табылмады' : locale === 'ru' ? 'Турниры не найдены' : 'No tournaments found'}</p>
            ) : (
              <div className="tournaments-grid">
                {tournaments.map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            )}
          </div>
        )}

        <style jsx>{`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }

          .hero {
            text-align: center;
            padding: 4rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
            margin-bottom: 3rem;
          }

          .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          .hero p {
            font-size: 1.25rem;
            opacity: 0.9;
          }

          .tournaments-section {
            margin-top: 2rem;
          }

          .tournaments-section h2 {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .tournaments-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }

          .loading, .error {
            text-align: center;
            padding: 2rem;
            font-size: 1.25rem;
          }

          .error {
            color: #f44336;
          }

          @media (max-width: 768px) {
            .hero h1 {
              font-size: 2rem;
            }

            .hero p {
              font-size: 1rem;
            }

            .tournaments-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}

