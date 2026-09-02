document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const header = document.querySelector('.site-header');
  const revealItems = document.querySelectorAll('main > *, main section > *, .info-card, .difficulty-card, .overview-card');

  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 12);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item, index) => {
      item.classList.add('reveal');
      item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
      observer.observe(item);
    });
  }

  // 外部リンクは新しいウィンドウで開く（安全対策で noopener noreferrer を追加）
  try {
    document.querySelectorAll('a[href^="http"]').forEach(a => {
      try {
        const url = new URL(a.href);
        if (url.origin !== location.origin) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        }
      } catch (e) {
        // 無効なURLはスキップ
      }
    });
  } catch (e) {
    // querySelectorAll エラーは無視
  }
});
