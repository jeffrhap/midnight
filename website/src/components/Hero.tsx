import { useState } from 'react';
import { WordClock } from './WordClock';
import { NotifyModal } from './NotifyModal';

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-[64px] md:pt-[80px] py-12 md:py-0 bg-[var(--bg-deep)]">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_var(--bg-deep)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12 w-full max-w-[1440px] mx-auto">
        {/* Left: Text content */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 max-w-[600px] text-center lg:text-left order-2 lg:order-1">
          <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[3px] md:tracking-[4px]">
            COMING 2026
          </span>
          
          <h1 className="font-mono text-[32px] sm:text-[48px] md:text-[56px] lg:text-[72px] font-bold text-[var(--text-glow)] tracking-normal leading-none">
            MODEL 00:00
          </h1>
          
          <p className="font-sans text-base md:text-lg lg:text-xl font-light text-[var(--text-secondary)] tracking-wide">
            Time, Written in Light.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 mt-2 md:mt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 md:px-10 lg:px-12 py-4 md:py-5 bg-[var(--accent-warm)] rounded-sm hover:bg-[var(--accent-warm-hover)] transition-colors shadow-[0_0_30px_rgba(45,71,57,0.4)] cursor-pointer"
            >
              <span className="font-mono text-sm md:text-base font-medium text-white tracking-[2px]">
                GET NOTIFIED
              </span>
            </button>

            <NotifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-sm border border-[var(--border-glow)] hover:border-[var(--accent-warm)] transition-colors cursor-pointer">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="font-mono text-sm md:text-base text-[var(--text-secondary)] tracking-[2px]">
                WATCH BUILD
              </span>
            </button> */}
          </div>
        </div>

        {/* Right: Word Clock */}
        <div className="p-4 md:p-6 lg:p-8 bg-[var(--bg-primary)] rounded-lg order-1 lg:order-2 border border-[var(--border-subtle)]">
          {/* Show different sizes based on screen */}
          <div className="hidden lg:block">
            <WordClock highlightedWords={['IT', 'IS', 'MIDNIGHT']} size="large" />
          </div>
          <div className="hidden md:block lg:hidden">
            <WordClock highlightedWords={['IT', 'IS', 'MIDNIGHT']} size="medium" />
          </div>
          <div className="block md:hidden">
            <WordClock highlightedWords={['IT', 'IS', 'MIDNIGHT']} size="small" />
          </div>
        </div>
      </div>
    </section>
  );
}
