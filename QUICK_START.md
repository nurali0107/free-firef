# Жылдам Бастау Нұсқаулары

## 1. Локальды Орнату

### Алғышарттар
- Node.js 18+ орнатылған
- PostgreSQL орнатылған және жұмыс істеп тұр
- npm орнатылған

### Қадамдар

1. **Зависимостилерді орнату:**
```bash
cd server
npm install
```

2. **Environment файлын құру:**
```bash
cd server
# .env файлын құрыңыз
echo "DATABASE_URL=postgresql://user:password@localhost:5432/tournament" > .env
echo "ADMIN_PASSWORD=нуарли07" >> .env
echo "NODE_ENV=development" >> .env
echo "PORT=5000" >> .env
```

3. **PostgreSQL база данныхты құру:**
```bash
# PostgreSQL-ге кіріңіз
psql -U postgres

# База данныхты құрыңыз
CREATE DATABASE tournament;

# Шығу
\q
```

4. **Серверді іске қосу:**
```bash
cd server
npm start
# Немесе дамыту режимі үшін:
npm run dev
```

5. **Frontend-ті тексеру:**
- `index.html` файлын браузерде ашыңыз
- `admin.html` файлын браузерде ашыңыз

## 2. Render.com-ға Деплой

### Қадамдар

1. **GitHub-қа код жіберу:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/tournament-website.git
git push -u origin main
```

2. **Render.com-да PostgreSQL құру:**
- Render.com-ға кіріңіз
- "New +" → "PostgreSQL"
- База данныхты құрыңыз

3. **Render.com-да Web Service құру:**
- "New +" → "Web Service"
- GitHub репозиторийді таңдаңыз
- Келесі параметрлерді орнатыңыз:
  - **Root Directory**: server
  - **Build Command**: npm install
  - **Start Command**: npm start
  - **Environment Variables**:
    - `DATABASE_URL`: (автоматиялық)
    - `ADMIN_PASSWORD`: нуарли07
    - `NODE_ENV`: production
    - `PORT`: 10000

4. **Frontend конфигурациясы:**
- `index.html` және `admin.html` файлдарында API URL-ді өзгертіңіз:
```javascript
const API_BASE_URL = 'https://your-server.onrender.com/api';
```

## 3. Тестілеу

1. **Сервер тестілеу:**
```
https://your-server.onrender.com/api/health
```

2. **Турнир құру:**
- `admin.html` арқылы админ панельге кіріңіз
- Пароль: нуарли07
- Турнир құрыңыз

3. **Тіркелу тестілеу:**
- `index.html` арқылы турнирге тіркеліңіз
- WhatsApp сілтемесін тексеріңіз

## 4. Мета тегтерді жаңарту

`index.html` файлында мета тегтерді өз доменіңізге сәйкес жаңартыңыз:
- `og:url`
- `twitter:url`
- `canonical`

## 5. API Endpoints

### Публикалық
- `GET /api/tournaments` - Барлық турнирлер
- `GET /api/tournaments/:id` - Турнир детальдары
- `GET /api/tournaments/upcoming/list` - Алдағы турнирлер
- `POST /api/registrations` - Тіркелу
- `GET /api/registrations/check` - Тіркелуді тексеру

### Админ (Password қажет)
- `POST /api/admin/tournaments` - Турнир құру
- `GET /api/admin/tournaments` - Барлық турнирлер
- `PUT /api/admin/tournaments/:id` - Турнирді жаңарту
- `DELETE /api/admin/tournaments/:id` - Турнирді жою
- `GET /api/admin/tournaments/history` - Турнир тарихы
- `POST /api/admin/tournaments/:id/players` - Ойыншы қосу
- `DELETE /api/admin/tournaments/:id/players/:playerId` - Ойыншыны жою

## Қолдау

Егер мәселелер туындаса, GitHub Issues арқылы хабарласыңыз.

