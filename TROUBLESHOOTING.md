# Решение проблем на Render.com

## Проблема: Сайт показывает ошибку при загрузке

### 1. Проверьте Environment Variables

Убедитесь, что в Render Dashboard для фронтенда установлены:

```
NEXT_PUBLIC_API_URL=https://tournament-server.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://free-firef.onrender.com
NODE_ENV=production
```

**Важно:** 
- `NEXT_PUBLIC_*` переменные должны быть установлены ДО сборки
- Если вы добавили их после сборки, нужно пересобрать проект

### 2. Проверьте логи в Render Dashboard

1. Откройте ваш сервис в Render Dashboard
2. Перейдите на вкладку "Logs"
3. Найдите ошибки (обычно красным цветом)

### 3. Типичные ошибки

#### Ошибка: "Cannot read property of undefined"

**Причина:** Компонент пытается обратиться к данным до их загрузки

**Решение:** Убедитесь, что все компоненты проверяют наличие данных:

```javascript
const title = tournament?.title?.[locale] || tournament?.title || 'Tournament';
```

#### Ошибка: "Network Error" или "Failed to fetch"

**Причина:** 
- API URL не настроен правильно
- Backend не запущен
- CORS проблемы

**Решение:**
1. Проверьте, что backend запущен: `https://tournament-server.onrender.com/api/health`
2. Проверьте `NEXT_PUBLIC_API_URL` в Environment Variables
3. Убедитесь, что backend слушает на `0.0.0.0`

#### Ошибка: "Module not found"

**Причина:** Неправильные пути импорта

**Решение:** Проверьте все импорты в компонентах

### 4. Проверка сервера

#### Backend должен показывать в логах:
```
Server is running on port XXXX
Listening on 0.0.0.0:XXXX
Database initialized successfully
```

#### Frontend должен показывать в логах:
```
> Ready on http://0.0.0.0:XXXX
> Environment: production
```

### 5. Проверка API

Откройте в браузере:
```
https://tournament-server.onrender.com/api/health
```

Должен вернуть:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "PostgreSQL",
  "timestamp": "..."
}
```

### 6. Проверка переменных окружения

В Render Dashboard:
1. Откройте ваш сервис
2. Перейдите в "Environment"
3. Убедитесь, что все переменные установлены

### 7. Пересборка проекта

Если вы изменили Environment Variables:
1. В Render Dashboard нажмите "Manual Deploy"
2. Выберите "Clear build cache & deploy"
3. Дождитесь завершения сборки

### 8. Проверка браузера

Откройте консоль браузера (F12):
1. Перейдите на вкладку "Console"
2. Найдите ошибки (красным цветом)
3. Скопируйте ошибку и проверьте в логах

### 9. Проверка Network запросов

В консоли браузера:
1. Перейдите на вкладку "Network"
2. Обновите страницу
3. Проверьте запросы к API
4. Если запросы красные - проблема с API

### 10. Типичные проблемы и решения

#### Проблема: Сайт загружается, но показывает "Loading..." бесконечно

**Решение:** 
- Проверьте, что API URL правильный
- Проверьте, что backend запущен
- Проверьте логи в Render

#### Проблема: "404 Not Found" на всех страницах

**Решение:**
- Проверьте, что сборка прошла успешно
- Проверьте, что используется правильная команда `yarn start` (не `next start`)

#### Проблема: Сайт показывает ошибку только на некоторых страницах

**Решение:**
- Проверьте конкретный компонент на этой странице
- Проверьте логи в Render для этой страницы

## Быстрая диагностика

1. ✅ Backend работает? → `https://tournament-server.onrender.com/api/health`
2. ✅ Environment Variables установлены? → Проверьте в Render Dashboard
3. ✅ Логи показывают ошибки? → Проверьте вкладку "Logs"
4. ✅ Сборка прошла успешно? → Проверьте вкладку "Events"
5. ✅ Браузер показывает ошибки? → Откройте консоль (F12)

## Контакты для помощи

Если проблема не решена:
1. Скопируйте логи из Render Dashboard
2. Скопируйте ошибки из консоли браузера
3. Проверьте все Environment Variables
4. Убедитесь, что оба сервиса (backend и frontend) запущены

