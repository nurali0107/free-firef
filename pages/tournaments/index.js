import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../Layout';
import TournamentCard from '../../TournamentCard';
import axios from 'axios';
import { useTranslation } from '../../lib/translations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function TournamentsPage() {
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
      const response = await axios.get(`${API_URL}/tournaments`, {
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
        title: t('tournaments'),
        description: locale === 'kz' 
          ? 'Барлық Free Fire және PUBG турнирлері'
          : locale === 'ru'
          ? 'Все турниры Free Fire и PUBG'
          : 'All Free Fire and PUBG tournaments'
      }}
    >
      <div className="container">
        <h1>{t('tournaments')}</h1>

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
          <div className="tournaments-grid">
            {tournaments.length === 0 ? (
              <p>{locale === 'kz' ? 'Турнирлер табылмады' : locale === 'ru' ? 'Турниры не найдены' : 'No tournaments found'}</p>
            ) : (
              tournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))
            )}
          </div>
        )}

        <style jsx>{`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }

          h1 {
            font-size: 2.5rem;
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
            .tournaments-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}

