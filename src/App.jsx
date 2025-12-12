import { useEffect, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Compradores from './pages/Compradores';
import Contato from './pages/Contato';
import Home from './pages/Home';
import Produtores from './pages/Produtores';
import Sobre from './pages/Sobre';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/produtores', label: 'Produtores' },
  { to: '/compradores', label: 'Compradores' },
  { to: '/sobre', label: 'Sobre' },
];

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>
  );
}

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored || (prefersLight ? 'light' : 'dark');
    applyTheme(initial);
    setTheme(initial);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (value) => {
    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('menu-open', menuOpen);
    return () => root.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 720px)');
    const closeOnDesktop = () => {
      if (!mql.matches) setMenuOpen(false);
    };
    mql.addEventListener('change', closeOnDesktop);
    return () => mql.removeEventListener('change', closeOnDesktop);
  }, []);

  const year = new Date().getFullYear();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {menuOpen && <div className="nav-backdrop" onClick={closeMenu} />}
      <header className="site-header">
        <div className="container">
          <Link className="brand" to="/" onClick={closeMenu}>
            <img src="/assets/Logo.png" className="logo-img" alt="Conecta Rural" />
            <strong>Conecta Rural</strong>
          </Link>
          <nav className="nav desktop-nav">
            <NavLinks onNavigate={closeMenu} />
            <ThemeSwitch theme={theme} onToggle={toggleTheme} />
          </nav>
          <button
            className="nav-toggle"
            aria-label="Abrir menu"
            aria-controls="site-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          />
        </div>
      </header>

      <div className={`side-panel ${menuOpen ? 'is-open' : ''}`}>
        <button className="nav-toggle panel-close" aria-label="Fechar menu" onClick={closeMenu} />
        <nav className="nav" id="site-nav">
          <NavLinks onNavigate={closeMenu} />
          <ThemeSwitch theme={theme} onToggle={toggleTheme} />
        </nav>
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtores" element={<Produtores />} />
          <Route path="/compradores" element={<Compradores />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <strong>Conecta Rural</strong>
            <p className="foot-note">Construindo pontes entre campo e cidade.</p>
          </div>
          <div className="foot-links">
            <NavLink to="/produtores" onClick={closeMenu}>
              Produtores
            </NavLink>
            <NavLink to="/compradores" onClick={closeMenu}>
              Compradores
            </NavLink>
            <NavLink to="/contato" onClick={closeMenu}>
              Contato
            </NavLink>
          </div>
          <div className="foot-legal">
            <div className="social-links">
              <a
                href="https://www.instagram.com/conectarural.app/"
                aria-label="Instagram Conecta Rural"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm10.25.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 10.5Z" />
                </svg>
              </a>
              <a
                href="mailto:conectarural00@gmail.com"
                aria-label="Email Conecta Rural"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Zm2.5-.5a.5.5 0 0 0-.5.5v.3l7 4.2 7-4.2v-.3a.5.5 0 0 0-.5-.5Zm13 3.1-6.52 3.92a.5.5 0 0 1-.48 0L5 9.1V17.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5Z" />
                </svg>
              </a>
            </div>
            <span>&copy; {year} Conecta Rural</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function NavLinks({ onNavigate }) {
  return (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={onNavigate}
        >
          {link.label}
        </NavLink>
      ))}
      <NavLink to="/contato" className="btn btn-sm" onClick={onNavigate}>
        Quero saber mais
      </NavLink>
    </>
  );
}

function ThemeSwitch({ theme, onToggle }) {
  const isLight = theme === 'light';
  return (
    <button
      className={`theme-toggle ${isLight ? 'is-light' : 'is-dark'}`}
      type="button"
      onClick={onToggle}
      aria-label={`Mudar para tema ${isLight ? 'escuro' : 'claro'}`}
    >
      <span className="theme-icon sun" aria-hidden="true" />
      <span className="theme-icon moon" aria-hidden="true" />
      <span className="theme-thumb" />
    </button>
  );
}
