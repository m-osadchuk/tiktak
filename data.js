/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  data.js — единственный файл который нужно редактировать        ║
  ╚══════════════════════════════════════════════════════════════════╝

  КАК ДОБАВИТЬ ПОЗДРАВЛЕНИЕ:

  1. Положи видео в папку  videos/  (например videos/ivan.mp4)
     или фото в папку      photos/  (например photos/ivan.jpg)

  2. Для видео — сделай обложку (превью первого кадра):
     Windows: запусти  make_covers.bat
     Mac/Linux: запусти  ./make_covers.sh
     Появится файл  photos/ivan_cover.jpg

  3. Скопируй шаблон ниже в массив POSTS и заполни поля.

  ──────────────────────────────────────────────────────────────────
  ПОЛЯ:

  id       — уникальный номер (просто следующий по счёту: 1, 2, 3...)
  type     — "video"  или  "photo"
  file     — путь к файлу:       "videos/ivan.mp4"
  cover    — обложка для видео:  "photos/ivan_cover.jpg"
             (создаётся скриптом make_covers.bat / make_covers.sh)
             Для фото оставь ""
  name     — имя сотрудника
  role     — должность / отдел
  emoji    — эмодзи если нет фото аватара
  avatar   — фото аватара: "photos/ivan_face.jpg"  (или "" если нет)
  message  — текст поздравления
  likes    — оставь 0
*/

const POSTS = [

  /* ══ ШАБЛОН — скопируй и заполни ══

  {
    id:      1,
    type:    "video",
    file:    "videos/ivan.mp4",
    cover:   "photos/ivan_cover.jpg",
    name:    "Иван",
    role:    "Отдел разработки",
    emoji:   "👨‍💻",
    avatar:  "",
    message: "Дорогие коллеги, с 8 Марта! Желаю вам счастья и тепла! 🌸",
    likes:   0
  },

  ════════════════════════════════════ */


  /* ── ДЕМО-КАРТОЧКИ (удали после добавления настоящих) ── */

  {
  id:      1,
  type:    "video",
  file:    "videos/mosad_small.mp4",
  cover:   "photos/mosad_cover.jpg",   // ← обложка из шага 2
  name:    "Мишаня",
  role:    "Департамент ИТ",
  emoji:   "👨‍💻",
  avatar:  "",
  message: "С 8 Марта! 🌸",
  likes:   0
},

  {
  id:      2,
  type:    "video",
  file:    "videos/preo_small.mp4",
  cover:   "photos/preo_cover.jpg",   // ← обложка из шага 2
  name:    "Мишутка",
  role:    "Департамент ИТ",
  emoji:   "👨‍💻",
  avatar:  "photos/mosad.jpg",
  message: "С 8 Марта! 🌸",
  likes:   5
},

  {
  id:      3,
  type:    "video",
  file:    "videos/mosad_small.mp4",
  cover:   "photos/mosad_cover.jpg",   // ← обложка из шага 2
  name:    "Михаэль",
  role:    "Департамент ИТ",
  emoji:   "👨‍💻",
  avatar:  "",
  message: "С 8 Марта! 🌸",
  likes:   "1000 и 1"
},

  {
  id:      4,
  type:    "video",
  file:    "videos/preo_small.mp4",
  cover:   "photos/preo_cover.jpg",   // ← обложка из шага 2
  name:    "Мишель",
  role:    "Департамент ИТ",
  emoji:   "👨‍💻",
  avatar:  "",
  message: "С 8 Марта! 🌸",
  likes:   4
},

];
