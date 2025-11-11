# Руководство по развертыванию

## Структура проекта

```
free-firef/
├── server/                 # Backend (Express API)
│   ├── index.js           # Главный файл сервера
│   ├── database.js        # Конфигурация PostgreSQL
│   ├── models/            # Модели данных
│   │   ├── Tournament.js
│   │   └── Registration.js
│   ├── routes/            # API маршруты
│   │   ├── tournaments.js
│   │   ├── registrations.js
│   │   └── admin.js
│   └── package.json       # Зависимости бэкенда
├── pages/                 # Next.js страницы
│   ├── _app.js
│   ├── index.js
│   └── tournaments/
│       ├── index.js
│       └── [id].js
├── components/            # React компоненты
│   ├── Layout.js
│   ├── SEO.js
│   ├── TournamentCard.js
│   ├── TournamentForm.js
│   └── RegistrationForm.js
├── lib/                   # Утилиты
│   └── translations.js
├── public/                # Статические файлы
│   ├── manifest.json
│   └── robots.txt
├── styles/                # Глобальные стили
│   └── globals.css
├── next.config.js         # Конфигурация Next.js
├── package.json           # Зависимости фронтенда
└── render.yaml            # Конфигурация Render.com
```

## Развертывание на Render.com

### 1. Подготовка репозитория

1. Убедитесь, что все файлы закоммичены в Git
2. Загрузите код в GitHub репозиторий

### 2. Создание базы данных

1. Войдите в Render.com
2. Создайте новый PostgreSQL database:
   - Name: `tournament-db`
   - Plan: Free
   - Region: Oregon (или ближайший к вам)

### 3. Создание Backend сервиса

1. Создайте новый Web Service:
   - Name: `tournament-server`
   - Environment: Node
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

2. Настройте Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: (автоматически из базы данных)
   - `ADMIN_PASSWORD`: `нуарли07` (или ваш пароль)

### 4. Создание Frontend сервиса

1. Создайте новый Web Service:
   - Name: `tournament-client`
   - Environment: Node
   - Build Command: `yarn install && yarn build`
   - Start Command: `yarn start`
   - Plan: Free

2. Настройте Environment Variables:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_API_URL`: `https://tournament-server.onrender.com/api`
   - `NEXT_PUBLIC_SITE_URL`: `https://tournament-client.onrender.com`

### 5. Альтернатива: Использование render.yaml

Если вы используете `render.yaml`, Render автоматически создаст оба сервиса:

1. Загрузите код в GitHub
2. В Render.com выберите "New" → "Blueprint"
3. Подключите репозиторий
4. Render автоматически создаст сервисы из `render.yaml`

**Важно:** После создания сервисов обновите URLs в Environment Variables:
- `NEXT_PUBLIC_API_URL` должен указывать на URL бэкенда
- `NEXT_PUBLIC_SITE_URL` должен указывать на URL фронтенда

## Локальная разработка

### Backend

```bash
cd server
npm install
npm start
```

Backend будет доступен на `http://localhost:5000`

### Frontend

```bash
yarn install
yarn dev
```

Frontend будет доступен на `http://localhost:3000`

### Environment Variables (локально)

Создайте `.env.local` в корне проекта:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Создайте `.env` в папке `server`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tournament
ADMIN_PASSWORD=нуарли07
NODE_ENV=development
PORT=5000
```

## API Endpoints

### Публичные

- `GET /api/tournaments` - Все турниры
- `GET /api/tournaments/:id` - Детали турнира
- `GET /api/tournaments/upcoming/list` - Предстоящие турниры
- `POST /api/registrations` - Регистрация на турнир
- `GET /api/registrations/check` - Проверка регистрации

### Админ (требует пароль)

- `POST /api/admin/tournaments` - Создать турнир
- `GET /api/admin/tournaments` - Все турниры (админ вид)
- `PUT /api/admin/tournaments/:id` - Обновить турнир
- `DELETE /api/admin/tournaments/:id` - Удалить турнир
- `GET /api/admin/tournaments/history` - История турниров
- `GET /api/admin/tournaments/:id/registrations` - Регистрации на турнир
- `POST /api/admin/tournaments/:id/players` - Добавить игрока
- `DELETE /api/admin/tournaments/:id/players/:playerId` - Удалить игрока

**Админ заголовок:** `x-admin-password: нуарли07`

## Поддерживаемые языки

- Казахский (kz) - по умолчанию
- Русский (ru)
- Английский (en)

## База данных

База данных автоматически создает таблицы при первом запуске:

- `tournaments` - Турниры
- `registrations` - Регистрации
- `tournament_history` - История удаленных турниров

## Проверка работы

1. Проверьте backend: `https://tournament-server.onrender.com/api/health`
2. Проверьте frontend: `https://tournament-client.onrender.com`
3. Проверьте API: `https://tournament-server.onrender.com/api/tournaments`

## Решение проблем

### Backend не запускается

- Проверьте `DATABASE_URL` в Environment Variables
- Проверьте логи в Render.com
- Убедитесь, что база данных создана и доступна

### Frontend не собирается

- Проверьте `NEXT_PUBLIC_API_URL` в Environment Variables
- Проверьте логи сборки в Render.com
- Убедитесь, что все зависимости установлены

### Ошибки базы данных

- Проверьте подключение к базе данных
- Убедитесь, что таблицы созданы (они создаются автоматически)
- Проверьте логи в Render.com

## Обновление кода

1. Внесите изменения в код
2. Закоммитьте изменения в Git
3. Загрузите изменения в GitHub
4. Render автоматически пересоберет и перезапустит сервисы

## Безопасность

- Никогда не коммитьте пароли в Git
- Используйте Environment Variables для секретов
- Регулярно обновляйте зависимости
- Используйте сильные пароли для админ панели

## Поддержка

Если у вас возникли проблемы, проверьте:
1. Логи в Render.com
2. Environment Variables
3. База данных подключение
4. API endpoints доступность

