import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from './lib/translations';

export default function TournamentCard({ tournament }) {
  const { t, locale } = useTranslation();
  const router = useRouter();
  // Handle both old format (titleObj) and new format (title as string or object)
  let title = 'Tournament';
  if (tournament.titleObj) {
    title = tournament.titleObj[locale] || tournament.titleObj.kz || tournament.titleObj.en || tournament.titleObj.ru || 'Tournament';
  } else if (typeof tournament.title === 'object') {
    title = tournament.title[locale] || tournament.title.kz || tournament.title.en || tournament.title.ru || 'Tournament';
  } else {
    title = tournament.title || 'Tournament';
  }

  return (
    <div className="tournament-card">
      <div className="tournament-header">
        <h3>{title}</h3>
        <span className={`badge ${tournament.game}`}>
          {t(tournament.game)}
        </span>
      </div>

      <div className="tournament-info">
        <p><strong>{t('category')}:</strong> {t(tournament.category)}</p>
        <p><strong>{t('date')}:</strong> {tournament.date ? new Date(tournament.date).toLocaleDateString(locale === 'kz' ? 'kk-KZ' : locale === 'ru' ? 'ru-RU' : 'en-US') : '-'}</p>
        <p><strong>{t('time')}:</strong> {tournament.time || '-'}</p>
        <p><strong>{t('currentPlayers')}:</strong> {tournament.currentPlayers || 0} / {tournament.maxPlayers || 0}</p>
        <p><strong>{t('status')}:</strong> {tournament.status ? t(tournament.status) : '-'}</p>
      </div>

          <div className="tournament-actions">
            <Link href={`/tournaments/${tournament.id || tournament._id}`}>
              <a className="view-button">{t('viewDetails')}</a>
            </Link>
          </div>

      <style jsx>{`
        .tournament-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .tournament-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .tournament-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .tournament-header h3 {
          margin: 0;
          font-size: 1.25rem;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: bold;
        }

        .badge.freefire {
          background: #FF6B35;
          color: white;
        }

        .badge.pubg {
          background: #F7931E;
          color: white;
        }

        .tournament-info {
          margin-bottom: 1rem;
        }

        .tournament-info p {
          margin: 0.5rem 0;
        }

        .view-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          text-align: center;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
        }

        .view-button:hover {
          background: linear-gradient(135deg, #45a049 0%, #388e3c 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
        }
      `}</style>
    </div>
  );
}

