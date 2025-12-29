export function Material() {
  return (
    <section id="about" className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[var(--bg-secondary)]">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20 w-full max-w-[1440px] mx-auto">
        {/* Left: Macro texture visual */}
        <div className="w-full lg:flex-1 aspect-[4/3] max-w-[640px] bg-[var(--bg-card)] rounded flex items-center justify-center">
          {/* Placeholder for 3D print texture image */}
          <div className="w-full h-full rounded bg-gradient-to-br from-[#1A1A1A] via-[#121212] to-[#0A0A0A] flex items-center justify-center">
            <span className="font-mono text-xs md:text-sm text-[var(--text-subtle)] tracking-[2px]">
              [MACRO TEXTURE]
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:flex-1 flex flex-col gap-4 md:gap-6 lg:gap-8 max-w-[520px] text-center lg:text-left">
          <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[3px] md:tracking-[4px]">
            MATERIAL.HONESTY
          </span>

          <h2 className="font-mono text-[28px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-bold text-[var(--text-primary)] tracking-[1px] md:tracking-[2px] leading-[1.2] whitespace-pre-line">
            {"ENGINEERED\nMATTE HOUSING."}
          </h2>

          <p className="font-sans text-base md:text-lg font-light text-[var(--text-secondary)] leading-relaxed">
            Monolithic FDM construction using premium matte PLA. 
            A unified, light-absorbing form designed to let the time speak.
          </p>

          {/* Specs */}
          <div className="flex flex-col gap-2 md:gap-4 mt-2 md:mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center py-3 md:py-4 border-b border-[var(--border-subtle)] gap-1 sm:gap-0">
              <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[2px]">
                PROCESS
              </span>
              <span className="font-mono text-sm md:text-base font-medium text-[var(--text-primary)] tracking-[1px]">
                FDM ADDITIVE MANUFACTURING
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center py-3 md:py-4 border-b border-[var(--border-subtle)] gap-1 sm:gap-0">
              <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[2px]">
                MATERIAL
              </span>
              <span className="font-mono text-sm md:text-base font-medium text-[var(--text-primary)] tracking-[1px]">
                BIODEGRADABLE PLA
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center py-3 md:py-4 gap-1 sm:gap-0">
              <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[2px]">
                FINISH
              </span>
              <span className="font-mono text-sm md:text-base font-medium text-[var(--text-primary)] tracking-[1px]">
                MATTE BLACK
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
