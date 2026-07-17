// Sticky header: tint background once scrolled
const headerWrap = document.getElementById('headerWrap');
if (headerWrap) {
  function updateHeaderState() {
    headerWrap.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// Hero image carousel
const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
  const slides = [...heroCarousel.querySelectorAll('.hero-slide')];
  const dots = [...heroCarousel.querySelectorAll('.hero-dot')];
  let activeIndex = 0;
  let carouselTimer;

  function goToSlide(index) {
    slides[activeIndex].classList.remove('is-active');
    dots[activeIndex].classList.remove('is-active');
    activeIndex = index;
    slides[activeIndex].classList.add('is-active');
    dots[activeIndex].classList.add('is-active');
  }

  function startCarousel() {
    carouselTimer = setInterval(() => {
      goToSlide((activeIndex + 1) % slides.length);
    }, 5000);
  }

  if (!prefersReducedMotion && slides.length > 1) {
    startCarousel();
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(carouselTimer);
        goToSlide(i);
        startCarousel();
      });
    });
  }
}

// "Get Started" CTA modal
const ctaModal = document.getElementById('ctaModal');
if (ctaModal) {
  const openTriggers = document.querySelectorAll('.js-open-cta-modal');
  const closeEls = ctaModal.querySelectorAll('[data-modal-close]');

  function openCtaModal(e) {
    e.preventDefault();
    ctaModal.classList.add('is-open');
    ctaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCtaModal() {
    ctaModal.classList.remove('is-open');
    ctaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openTriggers.forEach((btn) => btn.addEventListener('click', openCtaModal));
  closeEls.forEach((el) => el.addEventListener('click', closeCtaModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ctaModal.classList.contains('is-open')) closeCtaModal();
  });

  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = ctaForm.name.value.trim();
      const email = ctaForm.email.value.trim();
      const phone = ctaForm.phone.value.trim();
      const message = ctaForm.message.value.trim();
      const subject = encodeURIComponent(`New inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:ElizabethWynn@WynnTherapy.com?subject=${subject}&body=${body}`;
    });
  }
}
