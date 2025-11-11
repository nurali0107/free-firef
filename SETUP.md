# Орнату нұсқаулары

## Алғышарттар

1. **Node.js** (v14 немесе жоғары) - [Жүктеу](https://nodejs.org/)
2. **MongoDB** - [Жүктеу](https://www.mongodb.com/try/download/community)
3. **npm** немесе **yarn**

## Қадам 1: Репозиторийді клонидау

```bash
git clone <repository-url>
cd турнир
```

## Қадам 2: Зависимостілерді орнату

```bash
npm run install-all
```

Бұл команда барлық папкалардағы пакеттерді орнатады (root, server, client).

## Қадам 3: MongoDB-ді іске қосу

### Windows:
```bash
# MongoDB сервисін бастау
net start MongoDB
```

### macOS/Linux:
```bash
# MongoDB-ді бастау
mongod
```

Немесе MongoDB сервисін қызмет ретінде іске қосыңыз.

## Қадам 4: Backend конфигурациясы

`server` папкасында `.env` файлын жасаңыз:

```bash
cd server
copy .env.example .env
```

`.env` файлын өңдеп, қажетті мәндерді енгізіңіз:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tournament
JWT_SECRET=your_super_secret_jwt_key_here_change_this
NODE_ENV=development
```

**Ескерту:** `JWT_SECRET` мәнін өзгертуді ұмытпаңыз!

## Қадам 5: Админ аккаунтын құру

### Автоматты түрде:

```bash
cd server
npm run create-admin
```

Немесе параметрлермен:

```bash
npm run create-admin username email password
```

Мысалы:
```bash
npm run create-admin admin admin@tournament.kz MySecurePassword123
```

### Қолмен (MongoDB shell):

```javascript
use tournament
db.users.insertOne({
  username: "admin",
  email: "admin@example.com",
  password: "$2a$10$...", // bcrypt hash
  role: "admin",
  createdAt: new Date()
})
```

## Қадам 6: Серверді іске қосу

### Барлығын бірге (Backend + Frontend):

```bash
npm run dev
```

### Бөлек іске қосу:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## Қадам 7: Браузерде ашу

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## Пайдалану

### Админ панельге кіру

1. Браузерде http://localhost:3000/admin/login ашыңыз
2. Админ email және құпия сөзді енгізіңіз
3. "Кіру" батырмасын басыңыз

### Турнир құру

1. Админ панельге кіріңіз
2. "Турнир құру" батырмасын басыңыз
3. Турнир ақпараттарын толтырыңыз:
   - **Атауы (Қазақша)** - Мысалы: "Free Fire Соло Турнирі"
   - **Атауы (Орысша)** - Мысалы: "Free Fire Соло Турнир"
   - **Ойын** - Free Fire немесе PUBG
   - **Санат** - Соло, Дуо, немесе Отряд
   - **Күн** - Турнир күні
   - **Уақыт** - Турнир уақыты
   - **WhatsApp топ сілтемесі** - WhatsApp топ сілтемесі (https://chat.whatsapp.com/...)
   - **Ережелер (Қазақша)** - Турнир ережелері
   - **Ережелер (Орысша)** - Турнир ережелері
4. "Құру" батырмасын басыңыз

### Ойыншыларды тіркеу

1. Турнирлер тізімінде турнирді таңдаңыз
2. "Толығырақ" батырмасын басыңыз
3. Тіркелу формасын толтырыңыз:
   - **Ойын ID** - Ойындағы ID
   - **Ойыншы аты** - Ойыншы аты
   - **Телефон** - Телефон нөмірі
   - **Email** - Email (міндетті емес)
   - **Экран жазбасы** - Экран жазбасы сілтемесі (міндетті)
   - **Жұптас/Топ мүшелері** - Егер Дуо немесе Отряд болса
4. "Тіркелу" батырмасын басыңыз
5. WhatsApp топ сілтемесін алыңыз

### Тіркелулерді басқару (Админ)

1. Админ панельге кіріңіз
2. Турнирді таңдап, "Толығырақ" батырмасын басыңыз
3. Тіркелулер тізімінде:
   - **Бекіту** - Тіркелуді бекіту
   - **Қабылдамау** - Тіркелуді қабылдамау

## Мәселелерді шешу

### MongoDB қосылу қатесі

```bash
# MongoDB-дің жұмыс істеп тұрғанын тексеру
mongosh
# Немесе
mongo
```

### Port бос емес

`.env` файлында `PORT` мәнін өзгертіңіз немесе басқа портты пайдаланыңыз.

### Зависимостілер қатесі

```bash
# node_modules папкасын жою
rm -rf node_modules server/node_modules client/node_modules

# Тағыда орнату
npm run install-all
```

### Тілдер жұмыс істемейді

`client/public/locales` папкасының бар екенін тексеріңіз және файлдардың дұрыс екенін қараңыз.

## Өндіріс орнатуы

### Backend

```bash
cd server
npm install --production
npm start
```

### Frontend

```bash
cd client
npm install
npm run build
npm start
```

Немесе Vercel, Netlify сияқты платформаларды пайдаланыңыз.

## Қосымша ақпарат

- **API Документация:** http://localhost:5000/api/health
- **MongoDB:** mongodb://localhost:27017/tournament
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## Деректер базасы құрылымы

### Collections

- **users** - Пайдаланушылар (админ және ойыншылар)
- **tournaments** - Турнирлер
- **registrations** - Тіркелулер

## Қауіпсіздік

- JWT токендерді пайдалану
- Құпия сөздерді bcrypt арқылы хештеу
- Админ роуттарына қол жеткізуді тексеру
- CORS конфигурациясы

## Кері байланыс

Мәселелер немесе ұсыныстар үшін issue жасаңыз.

