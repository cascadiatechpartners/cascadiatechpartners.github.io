// main.js
document.addEventListener('DOMContentLoaded', function () {
  // set years in footer
  var y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id => {
    var el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // responsive nav toggles
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('site-nav');
      if (!nav) return;
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Contact form handler: attempts JS POST (Formspree style), fallback shows instructions
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = document.getElementById('formStatus');
      statusEl.textContent = 'Sending…';

      var action = form.getAttribute('action');
      if (!action || action.includes('YOUR_FORMSPREE_ID')) {
        statusEl.innerHTML = 'Form handler not configured. Please replace <code>YOUR_FORMSPREE_ID</code> in the form action with your Formspree ID, or email <a href="mailto:inquiries@cascadiatechpartners.com">inquiries@cascadiatechpartners.com</a>.';
        return;
      }

      var data = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          statusEl.textContent = 'Thanks — your message was sent. We will reply soon.';
        } else {
          response.json().then(function (data) {
            if (data && data.error) statusEl.textContent = data.error;
            else statusEl.textContent = 'There was a problem submitting the form. Please try again or email inquiries@cascadiatechpartners.com';
          }).catch(function () {
            statusEl.textContent = 'There was a problem submitting the form. Please try again or email inquiries@cascadiatechpartners.com';
          });
        }
      }).catch(function () {
        statusEl.textContent = 'Network error. Please try again or email inquiries@cascadiatechpartners.com';
      });
    });
  }
});
