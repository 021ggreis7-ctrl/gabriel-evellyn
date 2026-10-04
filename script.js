(function () {
  var intro = document.getElementById('intro');
  var site = document.getElementById('site');
  var enter = document.getElementById('enter');
  var music = document.getElementById('music');
  var bgm = document.getElementById('bgm');

  function setMusicUI(playing) {
    music.classList.toggle('paused', !playing);
    music.setAttribute('aria-label', playing ? 'Pausar música' : 'Tocar música');
  }

  function reveal() {
    var items = document.querySelectorAll('[data-r]');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('shown'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  enter.addEventListener('click', function () {
    // A música começa DENTRO do clique (exigência do iPhone)
    bgm.volume = 0.7;
    var p = bgm.play();
    if (p && p.then) {
      p.then(function () { setMusicUI(true); }).catch(function () { setMusicUI(false); });
    } else { setMusicUI(true); }

    site.hidden = false;
    music.hidden = false;
    window.scrollTo(0, 0);
    intro.classList.add('out');
    document.body.classList.remove('locked');
    reveal();
    setTimeout(function () { intro.style.display = 'none'; }, 1500);
  });

  music.addEventListener('click', function () {
    if (bgm.paused) { bgm.play(); setMusicUI(true); }
    else { bgm.pause(); setMusicUI(false); }
  });
})();
