(() => {
  const target = document.querySelector('[data-calendar]');
  const status = document.querySelector('[data-booking-status]');
  const link = window.SERVICES_CONFIG?.calLink;
  if (!target || !link) return;
  const fallback = document.querySelector('[data-booking-link]');
  fallback.href = `https://cal.com/${link}`;
  fallback.target = '_blank';
  fallback.rel = 'noopener noreferrer';
  fallback.hidden = false;
  status.textContent = 'Choose a time below. If the calendar does not load, use Open calendar.';
  // Official Cal.com embed bootstrap. The inline container exists before initialization.
  (function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement('script')).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==='string'){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,['initNamespace',namespace])}else p(cal,ar);return}p(cal,ar)}})(window,'https://app.cal.com/embed/embed.js','init');
  window.Cal('init', {origin:'https://app.cal.com'});
  window.Cal('inline', {elementOrSelector:'[data-calendar]',calLink:link,config:{layout:'month_view'}});
  window.Cal('ui', {theme:'light',styles:{branding:{brandColor:'#1f2937'}}});
})();
