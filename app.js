(() => {
  const buttons = [...document.querySelectorAll('[data-language]')];
  const setLanguage = (language, remember = true) => {
    const lang = language === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(element => {
      element.innerHTML = element.dataset[lang];
    });
    document.querySelectorAll('[data-alt-en]').forEach(element => {
      element.alt = element.getAttribute(`data-alt-${lang}`);
    });
    document.querySelectorAll('[data-aria-en]').forEach(element => {
      element.setAttribute('aria-label', element.getAttribute(`data-aria-${lang}`));
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === lang)));
    document.title = lang === 'zh' ? 'X.HUANG | 天体物理' : 'X.HUANG | Astrophysics';
    document.querySelector('meta[name="description"]').content = lang === 'zh'
      ? 'Xin Huang — 巴黎天文台 LIRA 博士生。研究星系动力学、恒星物理与天文数据分析。'
      : 'Xin Huang — PhD student at LIRA, Observatoire de Paris. Research in galactic dynamics, stellar physics, and astronomical data analysis.';
    if (remember) {
      try { localStorage.setItem('xhuang-language', lang); } catch { /* Language switching works when browser storage is unavailable. */ }
    }
  };
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  let initialLanguage = 'en';
  try { initialLanguage = localStorage.getItem('xhuang-language') || 'en'; } catch { /* Use English by default. */ }
  setLanguage(initialLanguage, false);
})();
