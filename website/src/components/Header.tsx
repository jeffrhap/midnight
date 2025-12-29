import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'NL', label: 'Nederlands' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[80px] px-4 md:px-8 lg:px-16 flex items-center justify-between bg-[var(--bg-deep)]/90 backdrop-blur-sm">
      {/* Logo */}
      <span className="font-sans text-base md:text-lg font-medium text-[var(--text-primary)] tracking-[3px] md:tracking-[4px]">
        MIDNIGHT
      </span>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        <nav className="flex items-center gap-6 lg:gap-10">
          <a href="#about" className="font-mono text-sm lg:text-base text-[var(--text-muted)] tracking-[2px] hover:text-[var(--text-primary)] transition-colors">
            ABOUT
          </a>
        </nav>

        {/* Language dropdown */}
        <div className="relative">
          <button 
            className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-2.5 rounded border border-[var(--border-subtle)] hover:border-[var(--border-glow)] transition-colors"
            onClick={() => setLangOpen(!langOpen)}
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="font-mono text-sm lg:text-base text-[var(--text-muted)]">{language}</span>
            <svg className={`w-3 h-3 text-[var(--text-muted)] transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {langOpen && (
            <div className="absolute top-full right-0 mt-2 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded min-w-[140px]">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`w-full px-4 py-2 text-left font-mono text-sm tracking-[1px] transition-colors ${
                    language === lang.code 
                      ? 'text-[var(--text-primary)] bg-[var(--bg-elevated)]' 
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangOpen(false);
                  }}
                >
                  {lang.code} — {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[64px] left-0 right-0 bg-[var(--bg-deep)]/95 backdrop-blur-sm border-b border-[var(--border-subtle)] md:hidden">
          <nav className="flex flex-col p-4 gap-4">
            <a 
              href="#about" 
              className="font-mono text-base text-[var(--text-muted)] tracking-[2px] py-2"
              onClick={() => setMenuOpen(false)}
            >
              ABOUT
            </a>
            
            {/* Mobile language selector */}
            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <span className="font-mono text-xs text-[var(--text-subtle)] tracking-[2px] mb-2 block">
                LANGUAGE
              </span>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`px-3 py-2 rounded border font-mono text-sm tracking-[1px] transition-colors ${
                      language === lang.code 
                        ? 'border-[var(--border-glow)] text-[var(--text-primary)]' 
                        : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
                    }`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMenuOpen(false);
                    }}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
