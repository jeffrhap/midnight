"use client";

import { useState, useMemo } from "react";
import { WordClock } from "./WordClock";
import { NotifyModal } from "./NotifyModal";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useLocalization } from "@/contexts/LocalizationContext";

// Generate random time words for Dutch clock
function getRandomDutchTime(): string[] {
  const hour = Math.floor(Math.random() * 12) + 1; // 1-12
  const minute = Math.floor(Math.random() * 60); // 0-59

  const words: string[] = ["HET", "IS"];

  // Dutch hour names
  const hours: Record<number, string> = {
    1: "EEN",
    2: "TWEE",
    3: "DRIE",
    4: "VIER",
    5: "VIJF",
    6: "ZES",
    7: "ZEVEN",
    8: "ACHT",
    9: "NEGEN",
    10: "TIEN",
    11: "ELF",
    12: "TWAALF",
  };

  // Determine minute words
  if (minute === 0) {
    // On the hour
    words.push(hours[hour]);
    words.push("UUR");
  } else if (minute < 5) {
    // Just past
    words.push(hours[hour]);
    words.push("UUR");
  } else if (minute < 10) {
    // 5 past
    words.push("VIJF");
    words.push("OVER");
    words.push(hours[hour]);
  } else if (minute < 15) {
    // 10 past
    words.push("TIEN");
    words.push("OVER");
    words.push(hours[hour]);
  } else if (minute < 20) {
    // Quarter past
    words.push("KWART");
    words.push("OVER");
    words.push(hours[hour]);
  } else if (minute < 25) {
    // 20 past (not in grid, use quarter)
    words.push("KWART");
    words.push("OVER");
    words.push(hours[hour]);
  } else if (minute < 30) {
    // 25 past (not in grid, use half)
    words.push("HALF");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  } else if (minute === 30) {
    // Half past
    words.push("HALF");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  } else if (minute < 35) {
    // Half past
    words.push("HALF");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  } else if (minute < 40) {
    // 25 to (not in grid, use half)
    words.push("HALF");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  } else if (minute < 45) {
    // 20 to (not in grid, use quarter)
    words.push("KWART");
    words.push("VOOR");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  } else if (minute < 50) {
    // Quarter to
    words.push("KWART");
    words.push("VOOR");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  } else if (minute < 55) {
    // 10 to
    words.push("TIEN");
    words.push("VOOR");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  } else {
    // 5 to
    words.push("VIJF");
    words.push("VOOR");
    const nextHour = hour === 12 ? 1 : hour + 1;
    words.push(hours[nextHour]);
  }

  return words;
}

// Generate random time words for English clock
function getRandomEnglishTime(): string[] {
  const hour = Math.floor(Math.random() * 12) + 1;
  const minute = Math.floor(Math.random() * 60);

  const words: string[] = ["IT", "IS"];

  // Simple implementation - just show hour for now
  const hours: Record<number, string> = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX",
    7: "SEVEN",
    8: "EIGHT",
    9: "NINE",
    10: "TEN",
    11: "ELEVEN",
    12: "TWELVE",
  };

  if (minute === 0) {
    words.push(hours[hour]);
  } else {
    words.push(hours[hour]);
  }

  return words;
}

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSubscribed } = useSubscription();
  const { t, language } = useLocalization();

  // Fixed time: "HET IS ZES UUR" (6 o'clock)
  // For English, show Dutch clock with notice
  const highlightedWords = useMemo(() => {
    return ["HET", "IS", "KWART", "VOOR", "ZES"];
  }, []);
  
  // Always use Dutch clock layout, even for English
  const clockLanguage = "NL";

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-[64px] md:pt-[80px] py-12 md:py-0 bg-[var(--bg-deep)]">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_var(--bg-deep)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12 w-full max-w-[1440px] mx-auto">
        {/* Left: Text content */}
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 max-w-[600px] text-center lg:text-left order-2 lg:order-1">
          <span className="font-mono text-xs md:text-sm text-[var(--text-muted)] tracking-[3px] md:tracking-[4px]">{t("hero.coming")}</span>

          <h1 className="font-mono text-[32px] sm:text-[48px] md:text-[56px] lg:text-[72px] font-bold text-[var(--text-glow)] tracking-normal leading-none">
            MODEL 00:00
          </h1>

          <p className="font-sans text-base md:text-lg lg:text-xl font-light text-[var(--text-secondary)] tracking-wide">
            {t("hero.tagline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 mt-2 md:mt-4">
            {isSubscribed ? (
              <button
                disabled
                className="w-full sm:w-auto px-8 md:px-10 lg:px-12 py-4 md:py-5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-sm cursor-not-allowed opacity-60"
              >
                <span className="font-mono text-sm md:text-base font-medium text-[var(--text-muted)] tracking-[2px]">
                  {t("hero.button.onList")}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 md:px-10 lg:px-12 py-4 md:py-5 bg-[var(--accent-warm)] rounded-sm hover:bg-[var(--accent-warm-hover)] transition-colors shadow-[0_0_30px_rgba(45,71,57,0.4)] cursor-pointer"
              >
                <span className="font-mono text-sm md:text-base font-medium text-white tracking-[2px]">{t("hero.button.notified")}</span>
              </button>
            )}

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
        <div className="flex flex-col items-center order-1 lg:order-2">
          <div className="p-4 md:p-6 lg:p-8 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-subtle)]">
            {/* Show different sizes based on screen */}
            <div className="hidden lg:block">
              <WordClock highlightedWords={highlightedWords} size="large" language={clockLanguage} />
            </div>
            <div className="hidden md:block lg:hidden">
              <WordClock highlightedWords={highlightedWords} size="medium" language={clockLanguage} />
            </div>
            <div className="block md:hidden">
              <WordClock highlightedWords={highlightedWords} size="small" language={clockLanguage} />
            </div>
          </div>
          {/* Notice for English version */}
          {language === "EN" && (
            <div className="mt-3 text-center">
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-[1px]">
                {t("hero.clockNotice")}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
