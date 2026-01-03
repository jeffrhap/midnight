import { WordClock } from "./WordClock";

export function Protocol() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[var(--bg-deep)]">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 md:gap-5 mb-8 md:mb-16 text-center">
        <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[3px] md:tracking-[4px]">
          THE.MIDNIGHT.PROTOCOL
        </span>
        <h2 className="font-sans text-[24px] sm:text-[28px] md:text-[36px] font-light text-[var(--text-primary)] tracking-wide">
          At 00:00, the noise fades.
        </h2>
        <p className="font-sans text-base md:text-lg lg:text-xl font-light text-[var(--text-muted)]">
          A moment of silence before the reset.
        </p>
      </div>

      {/* Split clocks */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12">
        {/* 23:59 Clock - IT IS ELEVEN */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="hidden md:block">
            <WordClock highlightedWords={["IT", "IS", "ELEVEN"]} size="medium" />
          </div>
          <div className="block md:hidden">
            <WordClock highlightedWords={["IT", "IS", "ELEVEN"]} size="small" />
          </div>
          <span className="font-mono text-sm md:text-base font-medium text-[var(--text-muted)] text-center">23:59</span>
        </div>

        {/* Arrow */}
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-[var(--text-subtle)] rotate-90 md:rotate-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>

        {/* 00:00 Clock - Visual 00:00 pattern */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="hidden md:block">
            <WordClock pattern="0000" size="medium" />
          </div>
          <div className="block md:hidden">
            <WordClock pattern="0000" size="small" />
          </div>
          <span className="font-mono text-sm md:text-base font-medium text-[var(--text-primary)] text-center">00:00</span>
        </div>
      </div>
    </section>
  );
}
