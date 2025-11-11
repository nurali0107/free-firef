import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  robots = 'index, follow'
}) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale, asPath } = router;

  // Site names for each language
  const siteNames = {
    kz: 'Free Fire және PUBG Турнирлері - Қазақстан',
    ru: 'Турниры Free Fire и PUBG - Казахстан',
    en: 'Free Fire and PUBG Tournaments - Kazakhstan'
  };

  // Descriptions for each language
  const descriptions = {
    kz: 'Free Fire және PUBG ойындарына арналған турнирлер платформасы. Соло, Дуо және Отряд режимдерінде турнирлерге қатысыңыз. Қазақстандық ойыншылар үшін.',
    ru: 'Платформа для турниров по играм Free Fire и PUBG. Участвуйте в турнирах в режимах Соло, Дуо и Отряд. Для игроков из Казахстана.',
    en: 'Tournament platform for Free Fire and PUBG games. Participate in tournaments in Solo, Duo and Squad modes. For players from Kazakhstan.'
  };

  // Keywords for each language
  const keywordsMap = {
    kz: 'free fire турнир, pubg турнир, free fire қазақстан, pubg қазақстан, free fire ойын, турнир платформа, киберспорт қазақстан, free fire соло, free fire дуо, free fire отряд',
    ru: 'free fire турнир, pubg турнир, free fire казахстан, pubg казахстан, free fire игра, турнирная платформа, киберспорт казахстан, free fire соло, free fire дуо, free fire отряд',
    en: 'free fire tournament, pubg tournament, free fire kazakhstan, pubg kazakhstan, free fire game, tournament platform, esports kazakhstan, free fire solo, free fire duo, free fire squad'
  };

  // Locale mappings for Open Graph
  const ogLocaleMap = {
    kz: 'kk_KZ',
    ru: 'ru_RU',
    en: 'en_US'
  };

  // Language codes for hreflang
  const langCodeMap = {
    kz: 'kk',
    ru: 'ru',
    en: 'en'
  };

  const siteName = siteNames[locale] || siteNames.kz;
  const defaultTitle = siteName;
  const defaultDescription = descriptions[locale] || descriptions.kz;
  const defaultKeywords = keywordsMap[locale] || keywordsMap.kz;
  
  const defaultImage = '/og-image.jpg';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  
  // Clean asPath to remove locale prefix for canonical URL
  const cleanPath = asPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
  const currentUrl = url || `${siteUrl}${cleanPath}`;
  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageImage = image || `${siteUrl}${defaultImage}`;
  const ogLocale = ogLocaleMap[locale] || 'kk_KZ';

  // Generate alternate language URLs
  const getAlternateUrl = (loc) => {
    const pathWithoutLocale = asPath.replace(/^\/[a-z]{2}(\/|$)/, '/');
    return `${siteUrl}/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta httpEquiv="Content-Language" content={locale} />
      <meta name="author" content="Tournament Platform" />
      <meta name="robots" content={robots} />
      <meta name="language" content={locale} />
      <meta name="geo.region" content="KZ" />
      <meta name="geo.placename" content="Kazakhstan" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content="kk_KZ" />
      <meta property="og:locale:alternate" content="ru_RU" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={pageTitle} />
      <meta name="twitter:creator" content="@tournament" />
      <meta name="twitter:site" content="@tournament" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={locale === 'kz' ? 'Турнирлер' : locale === 'ru' ? 'Турниры' : 'Tournaments'} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content={siteName} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Language Alternates - hreflang tags for SEO */}
      <link rel="alternate" hrefLang={langCodeMap.kz} href={getAlternateUrl('kz')} />
      <link rel="alternate" hrefLang={langCodeMap.ru} href={getAlternateUrl('ru')} />
      <link rel="alternate" hrefLang={langCodeMap.en} href={getAlternateUrl('en')} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${cleanPath}`} />

      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Preconnect for faster loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}

