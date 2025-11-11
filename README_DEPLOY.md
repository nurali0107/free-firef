# Render.com Деплой Нұсқаулары

## Тезисті Нұсқау

### Backend Деплойы

1. **Render.com-да Web Service құрыңыз**
   - Name: `tournament-server`
   - Environment: `Node`
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`

2. **Environment Variables қосыңыз:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   ```

3. **MongoDB Atlas құрыңыз** (тегін)
   - https://www.mongodb.com/cloud/atlas
   - Cluster құрыңыз
   - Connection string алыңыз

### Frontend Деплойы

1. **Render.com-да Web Service құрыңыз**
   - Name: `tournament-client`
   - Environment: `Node`
   - Build Command: `cd client && npm install && npm run build`
   - Start Command: `cd client && npm start`

2. **Environment Variables қосыңыз:**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://tournament-server.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://tournament-client.onrender.com
   ```

## SEO Мета Тегтері

Сайт SEO үшін дайындалды:
- ✅ Title тегтері
- ✅ Meta description
- ✅ Keywords
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Language alternates
- ✅ Robots.txt
- ✅ Sitemap.xml

## "Free Fire турнир" деп іздегенде шығуы үшін

1. **Google Search Console-ға тіркеліңіз**
   - https://search.google.com/search-console
   - Доменіңізді верификациялаңыз

2. **Sitemap жіберіңіз**
   - `https://your-domain.com/sitemap.xml`

3. **Сайтты индекстеуге жіберіңіз**
   - Search Console-да "URL Inspection" пайдаланыңыз

4. **Backlinks құрыңыз**
   - Әлеуметтік желілерде бөлісіңіз
   - Басқа сайттарға сілтемелер қосыңыз

5. **Контентті жақсартыңыз**
   - "Free Fire турнир" деген сөздерді көп қолданыңыз
   - Блог беттерін қосыңыз
   - Турнир сипаттамаларын толықтырыңыз

## Тест

Деплой аяқталғаннан кейін:
- Backend: `https://your-server.onrender.com/api/health`
- Frontend: `https://your-client.onrender.com`

## Көбірек ақпарат

Толық нұсқаулар үшін `RENDER_DEPLOY.md` файлын қараңыз.

