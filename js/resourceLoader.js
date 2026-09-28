document.addEventListener('DOMContentLoaded', async () => {
  const content = document.querySelector('.main-content');
  const sidebar = document.querySelector('.main-menu');
  const route = new URLSearchParams(location.search).get('route');
  const localURL = value => {
    const url = new URL(value, location.href);
    if (url.origin !== location.origin || !url.pathname.startsWith('/assets/resources/')) throw Error('Invalid resource');
    return url;
  };
  if (!route) { content.innerHTML='<p>Select a guide from <a href="/html/publications.html">Publications</a> to start reading.</p>'; document.querySelector('.table-of-content').hidden=true; return; }
  try {
    const response = await fetch(localURL(route));
    if (!response.ok) throw Error('Missing resource');
    const data = await response.json();
    document.querySelector('#resource-title').textContent=data.title;
    document.title=data.title+' | Zion Michael Group';
    let request=0;
    const links=[];
    const load = async (index, focus=false) => {
      const thisRequest=++request;
      content.setAttribute('aria-busy','true');
      try {
        const response = await fetch(localURL(data.sections[index].file));
        if (!response.ok) throw Error();
        const html=await response.text();
        if(thisRequest!==request)return;
        content.innerHTML=html;
        links.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
        const nav=document.createElement('div');nav.className='page-nav';
        for(const [label,target] of [['← Previous',index-1],['Next →',index+1]]) {
          if(target<0||target>=data.sections.length)continue;
          const button=document.createElement('button');button.type='button';button.className='page-nav__btn';button.textContent=label;button.addEventListener('click',()=>load(target,true));nav.append(button);
        }
        content.append(nav);
        if(focus){content.tabIndex=-1;content.focus();content.scrollIntoView({block:'start'});}
      } catch { if(thisRequest===request)content.innerHTML='<p>This section could not be loaded. Choose another section or try again.</p>'; }
      finally { if(thisRequest===request)content.removeAttribute('aria-busy'); }
    };
    data.sections.forEach((section,index)=>{
      const li=document.createElement('li');const link=document.createElement('a');link.href='#section-'+(index+1);link.textContent=section.name;
      link.addEventListener('click',event=>{event.preventDefault();load(index,true);});li.append(link);sidebar.append(li);links.push(link);
    });
    if(data.sections.length)await load(0);else content.textContent='This resource has no sections yet.';
  } catch {content.innerHTML='<p>This resource is unavailable. <a href="/html/publications.html">Return to publications</a>.</p>';document.querySelector('.table-of-content').hidden=true;}
});
