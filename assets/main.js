(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menu && nav) {
    const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); };
    menu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const list = document.getElementById('episodes-list');
  const empty = document.getElementById('episodes-empty');
  if (!list) return;
  // Keep episodes as data, not hand-edited HTML. The JSON file starts empty.
  fetch('data/episodes.json')
    .then(r => { if (!r.ok) throw new Error('Episode data unavailable'); return r.json(); })
    .then(data => {
      const episodes = Array.isArray(data) ? data : [];
      if (!episodes.length) return;
      for (const ep of episodes) {
        if (!ep || typeof ep.title !== 'string' || typeof ep.url !== 'string') continue;
        let destination;
        try {
          destination = new URL(ep.url);
          if (!['https:', 'http:'].includes(destination.protocol)) continue;
        } catch { continue; }
        const card = document.createElement('article');
        card.className = 'episode-card';
        const cover = document.createElement('div');
        cover.className = 'episode-cover';
        cover.textContent = String(ep.number || '✳').slice(0, 6);
        const body = document.createElement('div');
        body.className = 'episode-body';
        const meta = document.createElement('div');
        meta.className = 'episode-meta';
        meta.textContent = [ep.guest, ep.field].filter(x => typeof x === 'string' && x).join(' · ');
        const title = document.createElement('h3');
        title.textContent = ep.title;
        const desc = document.createElement('p');
        desc.textContent = typeof ep.description === 'string' ? ep.description : '';
        const link = document.createElement('a');
        link.href = destination.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Watch conversation ↗';
        body.append(meta, title, desc, link);
        card.append(cover, body);
        list.append(card);
      }
      if (list.children.length && empty) empty.hidden = true;
    })
    .catch(err => console.warn('Episodes could not be loaded:', err));
})();
