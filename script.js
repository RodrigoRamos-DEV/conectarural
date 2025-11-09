(function(){
  // URL do Apps Script (Web App) — cole aqui a URL após publicar
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzco1eCkNPUJ1t7LNCoD_lR8WW-vqOFAHZYYOEO9HrLekwhVKF3Kc3b5kBGAJnq498K_A/exec';

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  // Ano no rodapé
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // Rolagem suave
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      // fecha o painel/overlay se estiver aberto antes de rolar
      const panelOpen = document.querySelector('.side-panel.is-open');
      if (panelOpen){
        panelOpen.classList.remove('is-open');
        document.documentElement.classList.remove('menu-open');
        const bd = document.querySelector('.nav-backdrop');
        if (bd) bd.style.display = 'none';
        const tg = document.querySelector('.nav-toggle');
        tg?.setAttribute('aria-expanded','false');
      }
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Carrossel
  const car = $('.carousel');
  if (car){
    const slides = $$('.slide', car);
    const prevBtn = $('.prev', car);
    const nextBtn = $('.next', car);
    const dotsWrap = $('.dots', car);
    let index = 0;
    let auto = null;

    function renderDots(){
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role','tab');
        b.setAttribute('aria-label', `Ir para slide ${i+1}`);
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
      });
    }

    function update(){
      slides.forEach((s,i)=> s.classList.toggle('is-active', i === index));
      const dots = $$('.dots button', car);
      dots.forEach((d,i)=> d.setAttribute('aria-selected', i === index ? 'true':'false'));
    }

    function go(i){
      index = (i + slides.length) % slides.length;
      update();
    }

    function next(){ go(index + 1); }
    function prev(){ go(index - 1); }

    renderDots();
    update();

    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);

    function start(){
      stop();
      auto = setInterval(next, 4000);
    }
    function stop(){ if (auto) clearInterval(auto); }

    car.addEventListener('mouseenter', stop);
    car.addEventListener('mouseleave', start);
    start();
  }

  // Mobile nav toggle
  const nav = document.getElementById('site-nav');
  const togg = document.querySelector('.nav-toggle');
  if (nav && togg){
    const docEl = document.documentElement;
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.style.display = 'none';
    document.body.appendChild(backdrop);

    // Cria barra lateral e move a nav para dentro
    const panel = document.createElement('div');
    panel.className = 'side-panel';
    document.body.appendChild(panel);

    // Botão de fechar dentro do painel
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-toggle panel-close';
    closeBtn.setAttribute('aria-label','Fechar menu');
    closeBtn.addEventListener('click', ()=> setOpen(false));
    panel.appendChild(closeBtn);

    const headerContainer = document.querySelector('.site-header .container');
    const mql = window.matchMedia('(max-width: 720px)');
    const relocate = () => {
      if (mql.matches){
        if (nav.parentElement !== panel) panel.appendChild(nav);
      } else {
        if (nav.parentElement !== headerContainer) headerContainer.appendChild(nav);
        // garante estado fechado ao sair do mobile
        panel.classList.remove('is-open');
        backdrop.style.display = 'none';
        docEl.classList.remove('menu-open');
        togg.setAttribute('aria-expanded','false');
      }
    };
    relocate();
    mql.addEventListener('change', relocate);

    const isOpen = () => panel.classList.contains('is-open');
    const setOpen = (open) => {
      panel.classList.toggle('is-open', open);
      togg.setAttribute('aria-expanded', open ? 'true' : 'false');
      docEl.classList.toggle('menu-open', open);
      backdrop.style.display = open ? 'block' : 'none';
    };
    togg.addEventListener('click', ()=> setOpen(!isOpen()));
    backdrop.addEventListener('click', ()=> setOpen(false));
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> setOpen(false)));
    window.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Form: feedback local (sem backend)
  const form = document.getElementById('interest-form');
  if (form){
    const getUTM = () => {
      const params = new URLSearchParams(location.search);
      const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
      const out = {};
      keys.forEach(k => { const v = params.get(k); if (v) out[k] = v; });
      return out;
    };

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const success = $('.form-success', form);
      const error = $('.form-error', form);
      success?.setAttribute('hidden','');
      error?.setAttribute('hidden','');

      if (!form.checkValidity()){
        form.reportValidity();
        return;
      }

      const btn = $('button[type="submit"]', form);
      const prev = btn?.textContent;
      if (btn){ btn.disabled = true; btn.textContent = 'Enviando…'; }

      const payload = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        endereco: form.endereco.value.trim(),
        perfil: form.perfil.value,
        mensagem: form.mensagem.value.trim(),
        page: location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        ...getUTM()
      };

      try {
        const body = new URLSearchParams(payload);
        const resp = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body
        });
        if (!resp.ok) throw new Error('HTTP');
        // Apps Script pode responder texto puro; tentar parsear JSON, mas não é obrigatório
        try { await resp.json(); } catch(_) {}
        success?.removeAttribute('hidden');
        form.reset();
      } catch(err){
        error?.removeAttribute('hidden');
      } finally {
        if (btn){ btn.disabled = false; btn.textContent = prev || 'Quero participar'; }
      }
    });
  }
})();
