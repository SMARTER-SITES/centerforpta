// Netlify discovers the static forms; JavaScript observes the POST result.
const sources = {
  'contact-page-en': 'en',
  'footer-en': 'en',
  'contact-page-sr': 'sr',
  'footer-sr': 'sr',
};

// Netlify removes data-netlify from published HTML after form discovery.
document.querySelectorAll('form[name="contact"]').forEach((form) => {
  const source = form.querySelector('[name="form-source"]')?.value;
  const language = sources[source];
  if (!language) return;

  const error = document.createElement('p');
  error.setAttribute('role', 'alert');
  error.className = 'text-sm text-red-700';
  error.hidden = true;
  form.append(error);
  let pending = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const data = new FormData(form);
    // A filled honeypot must never produce a lead event.
    if (data.get('bot-field')) return;
    pending = true;
    error.hidden = true;
    form.setAttribute('aria-busy', 'true');
    const buttons = [...form.querySelectorAll('[type="submit"]')];
    const disabled = buttons.map((button) => button.disabled);
    buttons.forEach((button) => { button.disabled = true; });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (!response.ok) throw new Error('Form was not accepted');
    } catch {
      pending = false;
      form.removeAttribute('aria-busy');
      buttons.forEach((button, index) => { button.disabled = disabled[index]; });
      error.textContent = language === 'sr'
        ? 'Poruka nije poslata. Pokušajte ponovo ili pozovite (847) 230-0045.'
        : 'Your message could not be sent. Please try again or call (847) 230-0045.';
      error.hidden = false;
      return;
    }

    // Keep this attempt locked after acceptance, including while navigating.
    // Analytics must never contain any values entered into the form.
    let navigating = false;
    const navigate = () => {
      if (navigating) return;
      navigating = true;
      window.location.assign(form.action);
    };
    // Let GA dispatch before leaving; still navigate if analytics is blocked.
    const navigationTimeout = window.setTimeout(navigate, 2000);
    try {
      if (typeof window.gtag !== 'function') {
        window.clearTimeout(navigationTimeout);
        navigate();
        return;
      }
      window.gtag('event', 'generate_lead', {
        send_to: 'G-N367CP9MSE',
        form_name: 'contact',
        language,
        event_callback: () => {
          window.clearTimeout(navigationTimeout);
          navigate();
        },
        event_timeout: 2000,
      });
    } catch {
      window.clearTimeout(navigationTimeout);
      navigate();
    }
  });
});
