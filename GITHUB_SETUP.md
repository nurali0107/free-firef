# GitHub репозиторийге жіберу нұсқаулары

## 1. GitHub репозиторий құру

1. GitHub-ға кіріңіз (https://github.com)
2. "New repository" басыңыз
3. Келесі параметрлерді орнатыңыз:
   - **Repository name**: tournament-website
   - **Description**: Free Fire Tournament Website for Kazakhstan
   - **Visibility**: Public (немесе Private)
   - **Initialize**: README, .gitignore, license қоспаңыз (бізде бар)
4. "Create repository" басыңыз

## 2. Локальды репозиторий құру

```bash
# Проект директориясына өтіңіз
cd tournament-website

# Git инициализациясы
git init

# .gitignore файлын тексеріңіз (бар болуы керек)
cat .gitignore

# Барлық файлдарды қосу
git add .

# Бірінші commit
git commit -m "Initial commit: Free Fire Tournament Website with PostgreSQL backend"

# GitHub репозиторийге байланыстыру
git remote add origin https://github.com/your-username/tournament-website.git

# Branch атауын өзгерту
git branch -M main

# GitHub-ға жіберу
git push -u origin main
```

## 3. Кейінгі өзгерістерді жіберу

```bash
# Өзгерістерді қосу
git add .

# Commit жасау
git commit -m "Описание изменений"

# GitHub-ға жіберу
git push
```

## 4. Render.com-да Auto-Deploy қосу

1. Render.com-ға кіріңіз
2. Web Service-ті ашыңыз
3. "Settings" → "Build & Deploy" бөлімінде:
   - **Auto-Deploy**: Yes
   - **Branch**: main
4. Енді әр commit кезінде автоматиялық деплой болады

## 5. Environment Variables қосу (Render.com)

Render.com-да Web Service Settings-те:

1. "Environment" бөлімінде Environment Variables қосу:
   - `DATABASE_URL`: (PostgreSQL база данныхты қосқаннан кейін автоматиялық қосылады)
   - `ADMIN_PASSWORD`: нуарли07
   - `NODE_ENV`: production
   - `PORT`: 10000

## 6. PostgreSQL база данныхты қосу (Render.com)

1. Render.com-да "New +" → "PostgreSQL" басыңыз
2. Келесі параметрлерді орнатыңыз:
   - **Name**: tournament-db
   - **Database**: tournament
   - **User**: tournament_user
   - **Plan**: Free
3. "Create Database" басыңыз
4. База данных құрылғаннан кейін, Web Service-те `DATABASE_URL` автоматиялық қосылады (егер `render.yaml` файлын қолдансаңыз)

## 7. Тестілеу

1. Сервер жұмыс істеп тұрғанын тексеру:
   ```
   https://your-server.onrender.com/api/health
   ```

2. База данных құрылғанын тексеру:
   - Render.com-да PostgreSQL база данныхты ашыңыз
   - "Connect" батырмасын басып, таблицаларды көруге болады

## 8. Frontend конфигурациясы

`index.html` және `admin.html` файлдарында API URL-ді өз сервер URL-іңізге сәйкес жаңартыңыз:

```javascript
const API_BASE_URL = 'https://your-server.onrender.com/api';
```

## 9. Мета тегтерді жаңарту

`index.html` файлында мета тегтерді өз доменіңізге сәйкес жаңартыңыз:

```html
<meta property="og:url" content="https://your-domain.com/">
<meta property="twitter:url" content="https://your-domain.com/">
<link rel="canonical" href="https://your-domain.com/">
```

## 10. Деплой тестілеу

1. Турнир құру (админ панель арқылы)
2. Турнирге тіркелу (басты бет арқылы)
3. Ойыншыларды басқару (админ панель арқылы)
4. Турнир тарихын көру (админ панель арқылы)

## Қосымша ақпарат

- GitHub документациясы: https://docs.github.com
- Render.com документациясы: https://render.com/docs
- PostgreSQL документациясы: https://www.postgresql.org/docs/

