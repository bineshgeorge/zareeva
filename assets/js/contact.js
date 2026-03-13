document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('success-msg');
  const errorMsg = document.getElementById('error-msg');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Bootstrap validation
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Form is valid – proceed with AJAX submission
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xblkydvp", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });

      if (response.ok) {
        form.reset();
        form.classList.remove('was-validated');
        successMsg.classList.remove('d-none');
        errorMsg.classList.add('d-none');
      } else {
        throw new Error("Formspree error");
      }

    } catch (err) {
      successMsg.classList.add('d-none');
      errorMsg.classList.remove('d-none');
    }
  });
});



  // Collapse on nav-link click (SPA behavior)
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  });

  // Collapse on outside click
  document.addEventListener("click", function (event) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const isClickInside = navbarCollapse.contains(event.target);
    const isToggler = event.target.closest('.navbar-toggler');

    if (!isClickInside && !isToggler && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });

