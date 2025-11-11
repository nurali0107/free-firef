import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;

  const siteName = 'Free Fire және PUBG Турнирлері - Қазақстан';
  const defaultTitle = 'Free Fire және PUBG Турнирлері - Қазақстан';
  const defaultDescription = locale === 'kz' 
    ? 'Free Fire және PUBG ойындарына арналған турнирлер платформасы. Соло, Дуо және Отряд режимдерінде турнирлерге қатысыңыз. Қазақстандық ойыншылар үшін.'
    : 'Платформа для турниров по играм Free Fire и PUBG. Участвуйте в турнирах в режимах Соло, Дуо и Отряд. Для игроков из Казахстана.';
  const defaultKeywords = locale === 'kz'
    ? 'free fire турнир, pubg турнир, free fire қазақстан, pubg қазақстан, free fire ойын, турнир платформа, киберспорт қазақстан, free fire соло, free fire дуо, free fire отряд'
    : 'free fire турнир, pubg турнир, free fire казахстан, pubg казахстан, free fire игра, турнирная платформа, киберспорт казахстан, free fire соло, free fire дуо, free fire отряд';
  
  const defaultImage = '/og-image.jpg';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const currentUrl = url || `${siteUrl}${router.asPath}`;
  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageImage = image || `${siteUrl}${defaultImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content={locale} />
      <meta name="author" content="Tournament Platform" />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale === 'kz' ? 'kk_KZ' : 'ru_RU'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Турнирлер" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Language Alternates */}
      <link rel="alternate" hrefLang="kk" href={`${siteUrl}/kz${router.asPath}`} />
      <link rel="alternate" hrefLang="ru" href={`${siteUrl}/ru${router.asPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${router.asPath}`} />
    </Head>
  );
}

