// A phone-link click measures intent to call, not a completed call or a lead.
document.addEventListener('click', (event) => {
  if (!event.isTrusted || event.defaultPrevented || !(event.target instanceof Element)) return;
  if (!event.target.closest('a[href^="tel:"]') || typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', 'click_to_call', {
      send_to: 'G-N367CP9MSE',
      contact_method: 'phone',
      language: document.documentElement.lang === 'sr' ? 'sr' : 'en',
    });
  } catch {
    // Analytics must never interrupt the native phone link.
  }
});
