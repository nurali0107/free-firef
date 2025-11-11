import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SEO from './SEO';

export default function Layout({ children, seo = {} }) {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const changeLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <div className="layout">
      <SEO {...seo} />
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/">
              <a className="logo">{t('title')}</a>
            </Link>
            
            <nav className="nav">
              <Link href="/">
                <a className="nav-link">{t('home')}</a>
              </Link>
              <Link href="/tournaments">
                <a className="nav-link">{t('tournaments')}</a>
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin/dashboard">
                  <a className="nav-link">{t('adminPanel')}</a>
                </Link>
              )}
            </nav>

            <div className="header-actions">
              <div className="language-switcher">
                <button
                  onClick={() => changeLanguage('kz')}
                  className={i18n.language === 'kz' ? 'active' : ''}
                  aria-label="Қазақ тілі"
                  title="Қазақ тілі"
                >
                  Қаз
                </button>
                <button
                  onClick={() => changeLanguage('ru')}
                  className={i18n.language === 'ru' ? 'active' : ''}
                  aria-label="Русский язык"
                  title="Русский язык"
                >
                  Рус
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={i18n.language === 'en' ? 'active' : ''}
                  aria-label="English"
                  title="English"
                >
                  En
                </button>
              </div>

              {user ? (
                <button onClick={handleLogout} className="logout-button">
                  {t('logout')}
                </button>
              ) : (
                <Link href="/admin/login">
                  <a className="login-button">{t('login')}</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 {t('title')}. {locale === 'kz' ? 'Барлық құқықтар қорғалған.' : locale === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}</p>
        </div>
      </footer>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: #1a1a1a;
          color: white;
          padding: 1rem 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.2s;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          font-size: 1.8rem;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          text-decoration: none;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .language-switcher {
          display: flex;
          gap: 0.5rem;
        }

        .language-switcher button {
          padding: 0.5rem 1rem;
          border: 1px solid white;
          background: transparent;
          color: white;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
          font-size: 0.875rem;
          font-weight: 500;
          min-width: 45px;
        }

        .language-switcher button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .language-switcher button.active {
          background: white;
          color: #1a1a1a;
          font-weight: 600;
        }

        .language-switcher button:focus {
          outline: 2px solid rgba(255, 255, 255, 0.5);
          outline-offset: 2px;
        }

        .login-button,
        .logout-button {
          padding: 0.5rem 1rem;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
        }

        .main {
          flex: 1;
          padding: 2rem 0;
        }

        .footer {
          background: #1a1a1a;
          color: white;
          padding: 2rem 0;
          text-align: center;
          margin-top: 4rem;
        }

        .footer p {
          margin: 0.5rem 0;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1.2rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .nav {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }

          .nav-link {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

