﻿# projekt-webshop
 ## használat
 1. `$ git clone <repo>`
 2. mysql indítása
 3. `CREATE DATABASE studyguides;`
 4. terminál 1 -> `$ cd ./projekt-webshop/webshop-backend`
 5. `$ npm i`
 6. backend mappában `.env.example` átnevezése `.env`-re
 7. `$ npx prisma generate`
 8. `$ npx prisma db push`
 9. `$ npm run start:debug`
### frontend:
 9. `$ cd ./projekt-webshop/webshop-frontend`
 10. `$ npm i`
 11. `$ npm run dev`
 12. regisztráció folyamat és bejelentkezés
 13. backend mappában `$ npx prisma db seed`
 14. szerver újraindítása
 
