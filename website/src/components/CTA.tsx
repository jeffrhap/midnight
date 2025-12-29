export function CTA() {
  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-28 bg-[var(--bg-secondary)]">
      <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 max-w-[600px] text-center">
        <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[3px] md:tracking-[4px]">
          LIMITED.RUN.001
        </span>

        <h2 className="font-sans text-[28px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-light text-[var(--text-primary)] tracking-wide">
          Reserve Your Build
        </h2>

        <span className="font-mono text-base md:text-lg text-[var(--text-secondary)]">
          $349 USD · Ships Q2 2025
        </span>

        <button className="mt-2 md:mt-4 w-full sm:w-auto px-8 md:px-12 lg:px-14 py-4 md:py-5 lg:py-6 bg-[var(--accent-warm)] rounded-sm hover:bg-[var(--accent-warm-hover)] transition-colors shadow-[0_0_30px_rgba(45,71,57,0.4)]">
          <span className="font-mono text-sm md:text-base font-medium text-white tracking-[2px]">
            RESERVE NOW →
          </span>
        </button>
      </div>
    </section>
  );
}
