# Деплой Нұсқаулары - Render.com

## 1. GitHub-қа код жіберу

```bash
# Git инициализациясы
git init
git add .
git commit -m "Initial commit: Free Fire Tournament Website with PostgreSQL"

# GitHub репозиторийге жіберу
git remote add origin https://github.com/your-username/tournament-website.git
git branch -M main
git push -u origin main
```

## 2. Render.com-да PostgreSQL база данныхты құру

1. Render.com-ға кіріңіз (https://render.com)
2. "New +" → "PostgreSQL" басыңыз
3. Келесі параметрлерді орнатыңыз:
   - **Name**: tournament-db
   - **Database**: tournament
   - **User**: tournament_user
   - **Region**: Oregon (немесе сізге ыңғайлы)
   - **Plan**: Free
4. "Create Database" басыңыз
5. База данных құрылғаннан кейін, **Connection String**-ді көшіріңіз

## 3. Render.com-да Web Service құру

1. "New +" → "Web Service" басыңыз
2. GitHub репозиторийді таңдаңыз
3. Келесі параметрлерді орнатыңыз:
   - **Name**: tournament-server
   - **Environment**: Node
   - **Region**: Oregon
   - **Branch**: main
   - **Root Directory**: server
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables** қосу:
   - `DATABASE_URL`: PostgreSQL connection string (Render автоматически қосады, егер `render.yaml` файлын қолдансаңыз)
   - `ADMIN_PASSWORD`: нуарли07
   - `NODE_ENV`: production
   - `PORT`: 10000

5. "Create Web Service" басыңыз

## 4. Frontend конфигурациясы

### index.html және admin.html файлдарында API URL-ді жаңарту:

```javascript
// API Base URL - Change this to your Render.com server URL
const API_BASE_URL = window.API_URL || 'https://your-server.onrender.com/api';
```

**Немесе** HTML файлдардың `<head>` бөлімінде:

```html
<script>
    window.API_URL = 'https://your-server.onrender.com/api';
</script>
```

`your-server.onrender.com` орнына өз сервер URL-іңізді қойыңыз.

## 5. Frontend деплойы

### Вариант 1: Статикалық хостинг

Frontend файлдарын (`index.html`, `admin.html`) статикалық хостингте орналастырыңыз:
- Netlify
- Vercel
- GitHub Pages
- Render.com Static Site

### Вариант 2: Backend серверде

Backend сервер (`server/index.js`) статикалық файлдарды serve етеді, егер `NODE_ENV=production` болса.

## 6. Тестілеу

1. Сервер жұмыс істеп тұрғанын тексеру:
   ```
   https://your-server.onrender.com/api/health
   ```

2. Турнирлерді алу:
   ```
   https://your-server.onrender.com/api/tournaments/upcoming/list
   ```

3. Frontend-ті тексеру:
   - `index.html` файлын ашып, турнирлерді көру
   - `admin.html` файлын ашып, админ панельге кіру

## 7. Environment Variables (Render.com)

Render.com-да Environment Variables:

| Key | Value | Description |
|-----|-------|-------------|
| `DATABASE_URL` | Auto (from PostgreSQL) | PostgreSQL connection string |
| `ADMIN_PASSWORD` | нуарли07 | Админ пароль |
| `NODE_ENV` | production | Environment режимі |
| `PORT` | 10000 | Сервер порты |

## 8. База данных миграциясы

База данных автоматиялық түрде құрылады (`server/database.js` файлында `createTables` функциясы).

## 9. Мета тегтерді жаңарту

`index.html` файлында мета тегтерді өз доменіңізге сәйкес жаңартыңыз:

```html
<meta property="og:url" content="https://your-domain.com/">
<meta property="twitter:url" content="https://your-domain.com/">
<link rel="canonical" href="https://your-domain.com/">
```

## 10. CORS конфигурациясы

Егер frontend басқа доменде орналасқан болса, `server/index.js` файлында CORS конфигурациясын жаңартыңыз:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

## Қосымша ақпарат

- Render.com документациясы: https://render.com/docs
- PostgreSQL документациясы: https://www.postgresql.org/docs/

## Қолдау

Егер мәселелер туындаса, GitHub Issues арқылы хабарласыңыз.

