# Настройка портов для Render.com

## Важно для Render.com

Каждый веб-сервис на Render должен:
1. **Слушать на порту из переменной окружения `PORT`** (Render устанавливает это автоматически)
2. **Привязываться к хосту `0.0.0.0`** (а не localhost/127.0.0.1)

## Backend (Express Server)

### ✅ Правильная настройка (server/index.js)

```javascript
const PORT = process.env.PORT || 10000;

// Bind to 0.0.0.0 to accept connections from Render's load balancer
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Listening on 0.0.0.0:${PORT}`);
});
```

### ❌ Неправильная настройка

```javascript
// НЕПРАВИЛЬНО - слушает только на localhost
app.listen(PORT, () => {
  // Это будет слушать на 127.0.0.1, что не работает на Render
});

// НЕПРАВИЛЬНО - жестко заданный порт
app.listen(10000, '0.0.0.0', () => {
  // Render устанавливает свой порт через переменную окружения
});
```

## Frontend (Next.js)

### ✅ Next.js автоматически настроен правильно

Next.js по умолчанию:
- Использует `process.env.PORT` (если установлен)
- Слушает на `0.0.0.0` (все интерфейсы)
- Команда `next start` работает корректно на Render

### Настройка (package.json)

```json
{
  "scripts": {
    "start": "next start"
  }
}
```

Next.js автоматически:
- Использует PORT из переменной окружения
- Слушает на 0.0.0.0

## Environment Variables на Render

### Backend (tournament-server)

```yaml
envVars:
  - key: NODE_ENV
    value: production
  # PORT устанавливается автоматически Render, не нужно указывать
  - key: DATABASE_URL
    fromDatabase:
      name: tournament-db
      property: connectionString
  - key: ADMIN_PASSWORD
    sync: false
    value: ваш_пароль
```

### Frontend (tournament-client)

```yaml
envVars:
  - key: NODE_ENV
    value: production
  # PORT устанавливается автоматически Render
  - key: NEXT_PUBLIC_API_URL
    value: https://tournament-server.onrender.com/api
  - key: NEXT_PUBLIC_SITE_URL
    value: https://tournament-client.onrender.com
```

## Проверка

### После деплоя проверьте:

1. **Backend Health Check:**
   ```
   https://tournament-server.onrender.com/api/health
   ```

2. **Frontend:**
   ```
   https://tournament-client.onrender.com
   ```

3. **Логи в Render:**
   - Проверьте, что сервер слушает на правильном порту
   - Должно быть: `Listening on 0.0.0.0:XXXX` (где XXXX - порт от Render)

## Локальная разработка

### Backend

```bash
cd server
npm install
PORT=5000 npm start
# Сервер будет слушать на http://localhost:5000
```

### Frontend

```bash
yarn install
PORT=3000 yarn dev
# Frontend будет на http://localhost:3000
```

## Решение проблем

### Сервер не отвечает на Render

1. Проверьте, что сервер слушает на `0.0.0.0`, а не `localhost`
2. Проверьте, что используется `process.env.PORT`
3. Проверьте логи в Render Dashboard

### Порт уже занят

- На Render это не проблема - Render автоматически назначает порт
- Убедитесь, что не указываете жестко заданный порт в коде

### Next.js не запускается

- Next.js автоматически использует PORT из переменной окружения
- Проверьте, что команда `next start` используется (не `next dev`)

## Итог

✅ **Backend:** Использует `process.env.PORT` и слушает на `0.0.0.0`
✅ **Frontend:** Next.js автоматически настроен правильно
✅ **Render:** Автоматически устанавливает PORT через переменную окружения

Все готово к работе на Render.com!

