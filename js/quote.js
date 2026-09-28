(() => {
  const form = document.querySelector('#quote-form');
  if (!form) return;
  const tiers = {
    bdr: ['Launch', 'Growth', 'Scale', 'Enterprise'],
    product: ['Sprint', 'Build', 'Launch', 'Retainer'],
    automation: ['Starter', 'Operator', 'Scale', 'Enterprise']
  };
  const service = form.elements.service;
  const tier = form.elements.tier;
  function updateTiers(preferred = 'Not sure') {
    const values = [...(tiers[service.value] || []), 'Not sure'];
    tier.replaceChildren(...values.map(value => new Option(value, value)));
    tier.value = values.includes(preferred) ? preferred : 'Not sure';
  }
  const params = new URLSearchParams(location.search);
  if (Object.hasOwn(tiers, params.get('service'))) service.value = params.get('service');
  updateTiers(params.get('tier'));
  service.addEventListener('change', () => updateTiers());
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', event => {
    if (!Object.hasOwn(tiers, service.value) || ![...tiers[service.value], 'Not sure'].includes(tier.value)) {
      event.preventDefault();
      status.textContent = 'Please choose a service and one of its available tiers.';
    }
    // Native POST lets FormSubmit handle CAPTCHA/errors and redirect after acceptance.
  });
})();
