(() => {
  const publication = location.pathname.includes('publications');
  const grid = document.querySelector('#updates-grid');
  const empty = document.querySelector('#no-results');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const card = item => `<article><h3>${publication ? `<a href="/html/resource.html?route=${encodeURIComponent(item.route)}">${escape(item.title)}</a>` : escape(item.title)}</h3><p>${escape(item.description)}</p><div class="meta"><span>${escape(item.category)}</span><time datetime="${escape(item.date)}">${new Date(item.date+'T00:00:00').toLocaleDateString('en-CA')}</time></div></article>`;
  fetch(publication ? '/assets/publications.json' : '/assets/updates.json').then(r => { if (!r.ok) throw Error(); return r.json(); }).then(items => {
    items.sort((a,b) => b.date.localeCompare(a.date));
    const categories = [...new Set(items.map(i => i.category))];
    const stats = [items.length,categories.length,items.filter(i=>i.featured).length,new Set(items.flatMap(i=>i.tags||[])).size];
    ['total','categories','featured','tags'].forEach((key,i) => document.querySelector('#stat-'+key).textContent = stats[i]);
    const render = rows => { grid.innerHTML = rows.map(card).join(''); empty.classList.toggle('hidden',rows.length>0); };
    render(items);
    const featured = items.filter(i=>i.featured).slice(0,2);
    document.querySelector('#featured-section').hidden = !featured.length;
    document.querySelector('#featured-grid').innerHTML = featured.map(card).join('');
    const filters = document.querySelector('#filters');
    for (const category of ['All',...categories]) {
      const button = document.createElement('button'); button.type='button'; button.textContent=category; button.setAttribute('aria-pressed',String(category==='All'));
      button.addEventListener('click',()=>{filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render(category==='All'?items:items.filter(i=>i.category===category));});
      filters.append(button);
    }
  }).catch(()=>{document.querySelector('#featured-section').hidden=true;empty.classList.remove('hidden');empty.textContent='We couldn’t load these items. Please refresh the page or contact us for help.';});
})();
