# Free Fire Турнирлері - Tournament Website

Free Fire ойынына арналған турнирлер платформасы. Қазақстандық ойыншылар үшін Соло, Дуо және Отряд турнирлері.

## Технологиялар

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL 17
- **Deployment**: Render.com

## SEO Оптимизация

- ✅ Yandex және Google үшін оптимизацияланған
- ✅ Sitemap.xml қосылған
- ✅ Robots.txt конфигурацияланған
- ✅ Open Graph тегтері
- ✅ Мультитілді қолдау (Қазақша, Орысша)

## Функционалдық

- ✅ Турнирлерді көру
- ✅ Турнирге тіркелу
- ✅ Админ панель (турнир құру, басқару)
- ✅ Тіркелген ойыншыларды басқару
- ✅ Турнир тарихы
- ✅ WhatsApp тобына қосылу
- ✅ Екі тілді қолдау (Қазақша, Орысша)
- ✅ SEO оптимизациясы

## Орнату

### Алғышарттар

- Node.js 18+
- PostgreSQL
- npm

### Орнату қадамдары

1. Репозиторийді клонидау:
```bash
git clone https://github.com/your-username/tournament-website.git
cd tournament-website
```

2. Зависимостилерді орнату:
```bash
cd server
npm install
```

3. Environment айнымалыларын орнату:
```bash
cd server
cp .env.example .env
```

`.env` файлын төмендегідей толтырыңыз:
```
DATABASE_URL=postgresql://user:password@localhost:5432/tournament
ADMIN_PASSWORD=нуарли07
NODE_ENV=development
PORT=5000
```

4. База данныхты құру:
```bash
# PostgreSQL база данныхты құрыңыз
createdb tournament

# Немесе PostgreSQL клиентінде:
CREATE DATABASE tournament;
```

5. Серверді іске қосу:
```bash
cd server
npm start
# Немесе дамыту режимі үшін:
npm run dev
```

6. Frontend-ті ашу:
```bash
# index.html файлын браузерде ашыңыз
# Немесе келесі командамен:
# python -m http.server 8000
# Немесе:
# npx serve .
```

## Render.com-ға Деплой

### ⚠️ Маңызды!

Енді тек **бір сервис** қажет - `tournament-server`, ол HTML файлдарын да serve етеді!

### 1. GitHub-қа жіберу

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Render.com-да Деплой

#### Вариант 1: Blueprint (render.yaml пайдалану)

1. Render.com-ға кіріңіз
2. "New +" → "Blueprint" басыңыз
3. GitHub репозиторийді таңдаңыз
4. Render автоматты түрде `render.yaml` файлын оқып, барлық сервистерді құрады

#### Вариант 2: Қолмен Деплой

**PostgreSQL база деректерін құру:**

1. "New +" → "PostgreSQL" басыңыз
2. Келесі параметрлерді орнатыңыз:
   - **Name:** `tournament-db`
   - **Database:** `tournament`
   - **User:** `tournament_user`
   - **PostgreSQL Version:** `17` ⚠️ **Маңызды!**
   - **Plan:** `Free`

**Web Service құру:**

1. "New +" → "Web Service" басыңыз
2. GitHub репозиторийді таңдаңыз
3. Келесі параметрлерді орнатыңыз:
   - **Name:** `tournament-server`
   - **Environment:** `Node`
   - **Root Directory:** `server` ⚠️ **МАҢЫЗДЫ!**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

4. **Environment Variables:**
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (PostgreSQL база деректерінен автоматты түрде алынады - "Link Database" басып байланыстырыңыз)
   - `ADMIN_PASSWORD` = `нуарли07`

### 3. Тест

Деплой аяқталғаннан кейін:
- Негізгі бет: `https://your-server.onrender.com/`
- Админ панелі: `https://your-server.onrender.com/admin.html`
- API Health: `https://your-server.onrender.com/api/health`

**Ескерту:** Барлық HTML файлдары серверде serve етіледі, сондықтан екінші сервис қажет емес!

## API Endpoints

### Турнирлер

- `GET /api/tournaments` - Барлық турнирлерді алу
- `GET /api/tournaments/:id` - Турнирді алу
- `GET /api/tournaments/upcoming/list` - Алдағы турнирлерді алу

### Тіркелу

- `POST /api/registrations` - Турнирге тіркелу
- `GET /api/registrations/check` - Тіркелуді тексеру

### Админ

- `POST /api/admin/tournaments` - Турнир құру (Admin password қажет)
- `GET /api/admin/tournaments` - Барлық турнирлерді алу (Admin)
- `PUT /api/admin/tournaments/:id` - Турнирді жаңарту (Admin)
- `DELETE /api/admin/tournaments/:id` - Турнирді жою (Admin)
- `GET /api/admin/tournaments/history` - Турнир тарихы (Admin)
- `POST /api/admin/tournaments/:id/players` - Ойыншы қосу (Admin)
- `DELETE /api/admin/tournaments/:id/players/:playerId` - Ойыншыны жою (Admin)

## Структура

```
tournament-website/
├── server/
│   ├── database.js          # PostgreSQL байланысы
│   ├── index.js             # Express сервер
│   ├── models/
│   │   ├── Tournament.js    # Tournament модельі
│   │   └── Registration.js  # Registration модельі
│   ├── routes/
│   │   ├── tournaments.js   # Турнирлер роуты
│   │   ├── registrations.js # Тіркелу роуты
│   │   └── admin.js         # Админ роуты
│   └── package.json
├── index.html               # Frontend (негізгі бет)
├── admin.html               # Админ панель
├── render.yaml              # Render.com конфигурациясы
└── README.md
```

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:port/database
ADMIN_PASSWORD=нуарли07
NODE_ENV=production
PORT=5000
```

## Лицензия

MIT

## Автор

Free Fire Турнирлері

## Байланыс

Егер сұрақтарыңыз болса, GitHub Issues арқылы хабарласыңыз.
