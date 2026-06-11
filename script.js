$(document).ready(function () {

  // ===== Scroll progress bar =====
  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const progress = (scrollTop / docHeight) * 100;
    $('#scrollProgress').css('width', progress + '%');
  });

  // ===== Typing effect =====
  const phrases = [
    'Full-Stack Developer',
    'Laravel Developer',
    'Java Programmer',
    'CS Student'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    let displayed;

    if (!isDeleting) {
      charIndex++;
      displayed = current.substring(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        $('#typingText').text(displayed);
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      charIndex--;
      displayed = current.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    $('#typingText').text(displayed);
    setTimeout(typeLoop, isDeleting ? 50 : 100);
  }

  typeLoop();

  // ===== Project filter buttons =====
  $('.filter-btn').on('click', function () {
    const filter = $(this).data('filter');

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.project-item').fadeIn(300);
    } else {
      $('.project-item').each(function () {
        if ($(this).data('category') === filter) {
          $(this).fadeIn(300);
        } else {
          $(this).hide();
        }
      });
    }
  });

  // ===== Smooth scroll for nav links =====
  $('a.nav-link[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 60
      }, 500);
    }

    const navCollapse = document.getElementById('navMenu');
    if (navCollapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(navCollapse).hide();
    }
  });

  // ===== Navbar background on scroll + active link highlight =====
  $(window).on('scroll', function () {
    const scrollPos = $(this).scrollTop();

    // navbar style
    if (scrollPos > 50) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }

    // active nav link
    $('section, header').each(function () {
      const top = $(this).offset().top - 100;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');

      if (scrollPos >= top && scrollPos < bottom) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });

    // fade-up animation on scroll
    $('.fade-up').each(function () {
      const elTop = $(this).offset().top;
      const winBottom = scrollPos + $(window).height();

      if (winBottom > elTop + 60) {
        $(this).addClass('visible');
      }
    });
  });

  // trigger once on load (for elements already in view)
  $(window).trigger('scroll');

});
