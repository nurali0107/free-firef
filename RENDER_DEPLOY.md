# Render.com-да Деплой Нұсқаулары

## Backend (Server) Деплойы

### 1. Render.com-да Жаңа Web Service Құру

1. Render.com-ға кіріңіз
2. "New +" батырмасын басыңіз
3. "Web Service" таңдаңыз
4. GitHub репозиторийіңізді байланыстырыңыз

### 2. Конфигурация

**Name:** `tournament-server`

**Environment:** `Node`

**Build Command:**
```bash
cd server && npm install
```

**Start Command:**
```bash
cd server && npm start
```

**Plan:** Free (немесе қалағаныңыз)

### 3. Environment Variables (Өзгермелі Айнымалылар)

Render dashboard-та "Environment" бөлімінде мына айнымалыларды қосыңыз:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tournament?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
```

**Ескерту:** 
- `MONGODB_URI` - MongoDB Atlas немесе басқа MongoDB сервисінің connection string-і
- `JWT_SECRET` - Күшті құпия кілт (random string)
- `PORT` - Render автоматты түрде портты тағайындайды, бірақ кейде 10000 пайдалану керек

### 4. MongoDB Atlas Құру (Егер MongoDB жоқ болса)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) сайтына кіріңіз
2. Тегін аккаунт құрыңыз
3. Cluster құрыңыз (Free tier)
4. Database User құрыңыз
5. Network Access-те `0.0.0.0/0` қосыңыз (барлық IP-лерге рұқсат)
6. Connection string алыңыз
7. Render-де `MONGODB_URI` ретінде қолданыңыз

### 5. Деплой

Render автоматты түрде деплой бастайды. Күте тұрыңыз...

## Frontend (Client) Деплойы

### 1. Render.com-да Жаңа Web Service Құру

1. "New +" батырмасын басыңыз
2. "Web Service" таңдаңыз
3. Бірдей GitHub репозиторийіңізді байланыстырыңыз

### 2. Конфигурация

**Name:** `tournament-client`

**Environment:** `Node`

**Build Command:**
```bash
cd client && npm install && npm run build
```

**Start Command:**
```bash
cd client && npm start
```

**Plan:** Free

### 3. Environment Variables

```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://tournament-server.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://tournament-client.onrender.com
```

**Ескерту:**
- `NEXT_PUBLIC_API_URL` - Backend серверіңіздің Render URL-і
- `NEXT_PUBLIC_SITE_URL` - Frontend серверіңіздің Render URL-і

### 4. Деплой

Render автоматты түрде деплой бастайды.

## Домен Қосу (Опционал)

1. Render dashboard-та "Settings" бөліміне өтіңіз
2. "Custom Domain" бөлімінде доменіңізді қосыңыз
3. DNS настройкаларын орындаңыз

## Тест

Деплой аяқталғаннан кейін:

1. Backend: `https://your-server.onrender.com/api/health`
2. Frontend: `https://your-client.onrender.com`

## Мәселелерді Шешу

### Backend қосылмайды

- MongoDB connection string-ін тексеріңіз
- Environment variables-ді тексеріңіз
- Logs-ты қараңыз (Render dashboard-та)

### Frontend API-ға қосыла алмайды

- `NEXT_PUBLIC_API_URL` дұрыс екенін тексеріңіз
- CORS проблемасы болмауы керек (backend-те cors() қосылған)
- Backend серверінің жұмыс істеп тұрғанын тексеріңіз

### Build қателері

- Logs-ты қараңыз
- Dependencies дұрыс орналғанын тексеріңіз
- Node версиясын тексеріңіз (package.json-да engines)

## Автоматты Деплой

Render автоматты түрде GitHub-тағы өзгерістерді байқап, қайта деплой жасайды.

## Ескертулер

1. Free планда серверлер 15 минуттық қызметсіздіктен кейін "ұйықтайды"
2. Бірінші қоңырау баяу болуы мүмкін (cold start)
3. Production үшін paid plan пайдалану ұсынылады

