# Task Manager

Lucrare practică 5–6. Aplicația este făcută cu React, JavaScript și Vite. Pot adăuga sarcini, le pot marca drept finalizate și le pot șterge. Lista se poate filtra după starea sarcinilor.

## Pornire

Verific dacă am Node.js și npm, apoi instalez pachetele și pornesc aplicația.

```bash
node --version
npm --version
npm install
npm run dev
```

Deschid în browser adresa afișată în terminal.

## Structura proiectului

1. **Care este rolul folderului src?** Aici se află codul aplicației, componentele React și fișierul CSS.
2. **Ce reprezintă fișierul App.jsx?** Este componenta principală. Păstrează lista și filtrul în stare și conține funcțiile pentru adăugare, editare, marcare și ștergere.
3. **Ce informații sunt păstrate în package.json?** Numele proiectului, dependențele și comenzile npm, cum ar fi `npm run dev` și `npm run build`.
4. **Ce reprezintă folderul node_modules?** Conține pachetele instalate prin `npm install`. Se creează local și este exclus din Git.

`TaskForm.jsx` păstrează textul introdus cu `useState` și îl trimite către `App.jsx` la trimiterea formularului. `Task.jsx` primește sarcina și funcțiile pentru editare, bifare și ștergere prin props. `main.jsx` pornește aplicația în elementul `root` din `index.html`. `vite.config.js` configurează pluginul React.

## Lucrare practică 7–8

În aceeași aplicație am adăugat editarea și salvarea sarcinilor în browser.

- **Create** — scriu o denumire și apăs „Adaugă”.
- **Read** — văd lista și pot alege un filtru.
- **Update** — apăs „Editează”, schimb denumirea și apăs „Salvează”. Pot schimba și starea sarcinii prin bifare.
- **Delete** — apăs „Șterge” lângă sarcina respectivă.

Sarcinile formează un tablou de obiecte cu proprietățile `id`, `title` și `completed`. Lista este salvată în `localStorage` ca JSON și este citită la pornirea aplicației.

Pentru verificare, adaug două sarcini, redenumesc și bifez una dintre ele, apoi reîncarc pagina. Denumirea și bifa rămân. Șterg cealaltă sarcină și reîncarc din nou pagina. Sarcina ștearsă nu mai apare.
