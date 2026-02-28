/* ================================================
   TikTak — app.js
   ================================================ */

/* ── Лепестки сакуры ── */
(function () {
  var container = document.getElementById('petals');
  var symbols   = ['🌸','🌺','🌷','💮','🌼','🌹','💐','🪷','✿'];
  var count     = window.innerWidth < 600 ? 16 : 26;
  for (var i = 0; i < count; i++) {
    var el = document.createElement('div');
    el.className   = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left              = Math.random() * 100 + 'vw';
    el.style.fontSize          = (0.7 + Math.random() * 1.1) + 'rem';
    el.style.animationDuration = (8 + Math.random() * 13) + 's';
    el.style.animationDelay    = (Math.random() * 18) + 's';
    container.appendChild(el);
  }
})();

/* ── Градиенты — каждый сотрудник получает свой цвет ── */
var GRADIENTS = [
  'linear-gradient(150deg,#ff2d78,#9b2fff)',
  'linear-gradient(150deg,#ff6eb4,#ff2d78)',
  'linear-gradient(150deg,#9b2fff,#00d4aa)',
  'linear-gradient(150deg,#ffd066,#ff6eb4)',
  'linear-gradient(150deg,#00d4aa,#9b2fff)',
  'linear-gradient(150deg,#ff2d78,#ffd066)',
  'linear-gradient(150deg,#7b2fff,#ff2d78)',
  'linear-gradient(150deg,#f72585,#4361ee)',
  'linear-gradient(150deg,#4cc9f0,#f72585)',
  'linear-gradient(150deg,#06d6a0,#ff6eb4)',
  'linear-gradient(150deg,#ffd166,#ef476f)',
  'linear-gradient(150deg,#118ab2,#ffd166)',
  'linear-gradient(150deg,#e63946,#457b9d)',
  'linear-gradient(150deg,#2ec4b6,#e63946)',
  'linear-gradient(150deg,#ff9f1c,#ff2d78)',
  'linear-gradient(150deg,#9b2fff,#ff9f1c)',
  'linear-gradient(150deg,#ff2d78,#00b4d8)',
  'linear-gradient(150deg,#00b4d8,#ffd066)',
  'linear-gradient(150deg,#e040fb,#00e5ff)',
  'linear-gradient(150deg,#ff6d00,#e040fb)',
  'linear-gradient(150deg,#69f0ae,#ff2d78)',
  'linear-gradient(150deg,#ff2d78,#69f0ae)',
];

/* ── Лайки ── */
var likedSet = new Set(JSON.parse(localStorage.getItem('tt_likes') || '[]'));
function saveLikes() {
  localStorage.setItem('tt_likes', JSON.stringify([...likedSet]));
}

/* ── Аватар ── */
function avatarHtml(post, size) {
  size = size || 42;
  var style = 'width:'+size+'px;height:'+size+'px;font-size:'+Math.round(size*0.38)+'px;';
  if (post.avatar) {
    return '<div class="avatar" style="'+style+'"><img src="'+post.avatar+'" alt="'+post.name+'" onerror="this.parentElement.textContent=\''+post.emoji+'\'" /></div>';
  }
  return '<div class="avatar" style="'+style+'">'+post.emoji+'</div>';
}

/* ── Карточка ──
   Превью всегда = красивый градиент с именем и кнопкой ▶
   Если задан cover (jpg/png) — показываем его поверх градиента как фон
   Canvas-захват убран полностью — не работает на мобильных
── */
function buildCard(post) {
  var isLiked = likedSet.has(post.id);
  var grad    = GRADIENTS[post.id % GRADIENTS.length];

  /* Стиль превью: градиент по умолчанию, cover-картинка если есть */
  var coverStyle = 'background:' + grad + ';';
  if (post.cover) {
    coverStyle = 'background-image:url(' + post.cover + ');background-size:cover;background-position:center;';
  } else if (post.type === 'photo' && post.file) {
    /* Для фото — само фото и есть превью */
    coverStyle = 'background-image:url(' + post.file + ');background-size:cover;background-position:center top;';
  }

  var badgeClass = post.type === 'video' ? 'video' : 'photo';
  var badgeText  = post.type === 'video' ? '&#9654; Видео' : '&#128247; Фото';

  var card = document.createElement('div');
  card.className = 'card';
  card.innerHTML =
    '<div class="card-media" style="' + coverStyle + '">' +
      /* Затемняющий градиент снизу — чтобы имя читалось */
      '<div class="media-shade"></div>' +
      /* Имя сотрудника внизу превью */
      '<div class="media-name">' +
        '<div class="media-avatar">' + post.emoji + '</div>' +
        '<span>' + post.name + '</span>' +
      '</div>' +
      /* Кнопка play по центру */
      '<div class="media-play">&#9654;</div>' +
      /* Бейдж тип */
      '<span class="type-badge ' + badgeClass + '">' + badgeText + '</span>' +
    '</div>' +
    '<div class="card-info">' +
      '<div class="card-author">' +
        avatarHtml(post, 38) +
        '<div>' +
          '<div class="author-name">' + post.name + '</div>' +
          '<div class="author-role">' + post.role + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-message">' + post.message + '</div>' +
    '</div>' +
    '<div class="card-reactions">' +
      '<button class="reaction ' + (isLiked ? 'liked' : '') + '" data-id="' + post.id + '">' +
        '&#10084;&#65039;&nbsp;<span class="lcount">' + (post.likes || 0) + '</span>' +
      '</button>' +
      '<button class="reaction share-btn" data-id="' + post.id + '">' +
        '&#128279;&nbsp;<span class="share-label">Поделиться</span>' +
      '</button>' +
    '</div>';

  /* Открыть модалку */
  card.querySelector('.card-media').addEventListener('click', function() { openModal(post); });

  /* Лайк */
  var likeBtn = card.querySelector('.reaction[data-id]');
  likeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (likedSet.has(post.id)) {
      likedSet.delete(post.id);
      post.likes = Math.max(0, (post.likes || 0) - 1);
      likeBtn.classList.remove('liked');
    } else {
      likedSet.add(post.id);
      post.likes = (post.likes || 0) + 1;
      likeBtn.classList.add('liked');
    }
    likeBtn.querySelector('.lcount').textContent = post.likes || 0;
    likeBtn.style.transform = 'scale(1.45)';
    setTimeout(function(){ likeBtn.style.transform = ''; }, 200);
    saveLikes();
  });

  /* Поделиться */
  card.querySelector('.share-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    var url   = location.href.split('#')[0] + '#post-' + post.id;
    var btn   = e.currentTarget;
    var label = btn.querySelector('.share-label');
    if (navigator.share) {
      navigator.share({ title: 'TikTak', text: post.message, url: url });
    } else {
      navigator.clipboard.writeText(url).then(function() {
        label.textContent = 'Скопировано!';
        btn.style.color   = 'var(--teal)';
        setTimeout(function(){ label.textContent = 'Поделиться'; btn.style.color = ''; }, 1800);
      });
    }
  });

  return card;
}

/* ── Баннер ── */
function buildBanner() {
  var div = document.createElement('div');
  div.className = 'banner';
  div.innerHTML =
    '<h1>🌸 С 8 Марта! 🌸</h1>' +
    '<p>Дорогие коллеги, каждый из нас хочет сказать вам тёплые слова.<br>' +
    'Смотрите поздравления — и знайте, что вы очень важны для нас! 💐</p>';
  return div;
}

/* ── Рендер ── */
function renderFeed() {
  var feed = document.getElementById('feed');
  feed.innerHTML = '';
  feed.appendChild(buildBanner());
  if (!POSTS || POSTS.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<div class="empty-icon">🎬</div><p>Добавь видео в <code>videos/</code>,<br>затем заполни запись в <code>data.js</code>.</p>';
    feed.appendChild(empty);
    return;
  }
  POSTS.forEach(function(post) { feed.appendChild(buildCard(post)); });
}

/* ── Модалка ── */
function openModal(post) {
  var overlay = document.getElementById('modalOverlay');
  var mm      = document.getElementById('modalMedia');
  var grad    = GRADIENTS[post.id % GRADIENTS.length];

  if (post.type === 'video' && post.file) {
    mm.innerHTML = '<video src="' + post.file + '" controls autoplay playsinline ' +
      'style="width:100%;max-height:65vh;display:block;background:#000;"></video>';
  } else if (post.type === 'photo' && post.file) {
    mm.innerHTML = '<img src="' + post.file + '" style="width:100%;max-height:65vh;object-fit:contain;display:block;" />';
  } else {
    mm.innerHTML = '<div style="min-height:240px;background:' + grad + ';display:flex;align-items:center;justify-content:center;font-size:5rem;">' +
      (post.type === 'video' ? '▶️' : '📷') + '</div>';
  }

  document.getElementById('modalAuthor').innerHTML =
    avatarHtml(post, 48) +
    '<div>' +
      '<div class="modal-author-name">' + post.name + '</div>' +
      '<div class="modal-author-role">' + post.role + '</div>' +
    '</div>';
  document.getElementById('modalMessage').textContent = post.message;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  var vid = overlay.querySelector('video');
  if (vid) { vid.pause(); vid.currentTime = 0; }
}

document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(); });

renderFeed();
