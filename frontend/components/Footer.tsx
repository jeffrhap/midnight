export function Footer() {
  return (
    <footer className="px-4 md:px-8 lg:px-16 pt-16 pb-10 bg-[var(--bg-deep)]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* Main row - use grid with weighted columns to center the middle column */}
        <div className="flex flex-col gap-8 items-center md:grid md:grid-cols-[2fr_1fr_1fr] md:gap-8 md:items-start">
          {/* Left: Logo & tagline - takes more space */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <span className="font-sans text-sm font-medium text-[var(--text-primary)] tracking-[4px]">MIDNIGHT</span>
            <p className="font-sans text-[13px] font-light text-[var(--text-muted)] leading-relaxed max-w-[240px] mx-auto md:mx-0">
              Ultra-premium tech objects.
              <br />
              Where time meets craft.
            </p>
          </div>

          {/* Center: Product Lineup - positioned towards center */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="font-mono text-[10px] text-[var(--text-subtle)] tracking-[3px]">PRODUCT.LINEUP</span>
            <span className="font-mono text-[13px] font-medium text-[var(--text-primary)] tracking-[2px]">
              MODEL 00:00 [IN DEVELOPMENT]
            </span>
            {/* <span className="font-mono text-xs text-[var(--text-subtle)] tracking-[1px]">
              MODEL 00:01 [IN DEV]
            </span> */}
          </div>

          {/* Right: Connect */}
          <div className="flex flex-col gap-4 text-center md:text-right md:items-end">
            <span className="font-mono text-[10px] text-[var(--text-subtle)] tracking-[3px]">CONNECT</span>
            <a
              href="https://instagram.com/midnight00.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--text-muted)] tracking-[2px] hover:text-[var(--text-primary)] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="#"
              className="font-mono text-xs text-[var(--text-muted)] tracking-[2px] hover:text-[var(--text-primary)] transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--border-subtle)]" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs text-[var(--text-muted)] tracking-[2px]">COPYRIGHT 2026 MIDNIGHT</span>
          <span className="font-mono text-xs font-medium text-[var(--text-primary)] tracking-[2px]">midnight00.nl</span>
        </div>
      </div>
    </footer>
  );
}
