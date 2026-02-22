// Load nav.html into #site-nav
fetch('nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('site-nav').innerHTML = html;

    // After loading, re-bind dropdown toggles
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var menu = btn.nextElementSibling;
        var isOpen = menu.classList.toggle('show');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });
  })
  .catch(err => console.error('Failed to load nav:', err));

document.addEventListener('DOMContentLoaded', function () {
  // set years in footer
  var y = new Date().getFullYear();
  ['year','year2','year3','year4','year5','year6'].forEach(id => {
    var el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // responsive nav toggles (main menu)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('site-nav');
      if (!nav) return;
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Dropdown toggle for Services (mobile)
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', function(e){
      e.stopPropagation(); // prevent closing immediately
      var menu = btn.nextElementSibling;
      var isOpen = menu.classList.toggle('show');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Close dropdowns if clicking outside
  document.addEventListener('click', function(){
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      menu.classList.remove('show');
      var toggle = menu.previousElementSibling;
      if(toggle) toggle.setAttribute('aria-expanded','false');
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
        statusEl.innerHTML = 'Form handler not configured. Please email <a href="mailto:inquiries@cascadiatechpartners.com">inquiries@cascadiatechpartners.com</a>.';
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
