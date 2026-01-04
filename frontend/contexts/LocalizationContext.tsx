"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "EN" | "NL";

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const LANGUAGE_KEY = "midnight_language";

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Header
    "nav.about": "ABOUT",
    "nav.language": "LANGUAGE",

    // Hero
    "hero.coming": "COMING 2026",
    "hero.tagline": "Time, Written in Light.",
    "hero.button.notified": "GET NOTIFIED",
    "hero.button.onList": "YOU'RE ON THE LIST",

    // CTA
    "cta.coming": "COMING.2026",
    "cta.title": "Be the First to Know",
    "cta.subtitle": "Launching 2026",
    "cta.button.notify": "NOTIFY ME →",
    "cta.button.onList": "YOU'RE ON THE LIST",

    // Material
    "material.section": "MATERIAL.HONESTY",
    "material.title": "ENGINEERED\nMATTE HOUSING.",
    "material.description":
      "Monolithic FDM construction using premium matte PLA. A unified, light-absorbing form designed to let the time speak.",
    "material.process": "PROCESS",
    "material.processValue": "FDM ADDITIVE MANUFACTURING",
    "material.material": "MATERIAL",
    "material.materialValue": "BIODEGRADABLE PLA",
    "material.finish": "FINISH",
    "material.finishValue": "MATTE BLACK",

    // Protocol
    "protocol.section": "THE.MIDNIGHT.PROTOCOL",
    "protocol.title": "At 00:00, the noise fades.",
    "protocol.subtitle": "A moment of silence before the reset.",

    // Footer
    "footer.tagline": "Ultra-premium tech objects.\nWhere time meets craft.",
    "footer.productLineup": "PRODUCT.LINEUP",
    "footer.productStatus": "MODEL 00:00 [IN DEVELOPMENT]",
    "footer.connect": "CONNECT",
    "footer.contact": "CONTACT",
    "footer.copyright": "COPYRIGHT 2026 MIDNIGHT",

    // NotifyModal
    "modal.title": "Get Notified",
    "modal.description": "Be the first to know when we launch.",
    "modal.emailPlaceholder": "your@email.com",
    "modal.button.submit": "NOTIFY ME",
    "modal.button.submitting": "SUBMITTING...",
    "modal.button.close": "CLOSE",
    "modal.success.title": "You're on the list",
    "modal.success.description": "We'll notify you when MODEL 00:00 launches.",
    "modal.privacy": "No spam. Unsubscribe anytime.",
  },
  NL: {
    // Header
    "nav.about": "OVER ONS",
    "nav.language": "TAAL",

    // Hero
    "hero.coming": "VERWACHT 2026",
    "hero.tagline": "Tijd, geschreven in licht.",
    "hero.button.notified": "BLIJF OP DE HOOGTE",
    "hero.button.onList": "JE STAAT OP DE LIJST",

    // CTA
    "cta.coming": "VERWACHT.2026",
    "cta.title": "Wees als eerste op de hoogte",
    "cta.subtitle": "Lancering in 2026",
    "cta.button.notify": "HOUD MIJ OP DE HOOGTE →",
    "cta.button.onList": "JE STAAT OP DE LIJST",

    // Material
    "material.section": "MATERIAAL.PUURHEID",
    "material.title": "MATTE\nPRECISIE BEHUIZING.", // Changed from "GECONSTRUEERDE"
    "material.description": "Vervaardigd uit één stuk premium mat PLA. Een naadloze, lichtabsorberende vorm die de tijd laat spreken.", // Changed from "Monolithische" to "Vervaardigd uit één stuk" (Crafted from one piece)
    "material.process": "PROCES",
    "material.processValue": "FDM ADDITIVE MANUFACTURING",
    "material.material": "MATERIAAL",
    "material.materialValue": "BIOLOGISCH AFBREEKBAAR PLA",
    "material.finish": "AFWERKING",
    "material.finishValue": "MATZWART",

    // Protocol
    "protocol.section": "THE.MIDNIGHT.PROTOCOL",
    "protocol.title": "Om 00:00 vervaagt de ruis.",
    "protocol.subtitle": "Een moment van stilte voor de reset.",

    // Footer
    "footer.tagline": "Ultra-premium tech objecten.\nWaar tijd en ambacht samenkomen.",
    "footer.productLineup": "COLLECTIE",
    "footer.productStatus": "MODEL 00:00 [IN ONTWIKKELING]",
    "footer.connect": "VOLGEN",
    "footer.contact": "CONTACT",
    "footer.copyright": "© 2026 MIDNIGHT",

    // NotifyModal
    "modal.title": "Blijf op de hoogte",
    "modal.description": "Hoor het als eerste wanneer we lanceren.",
    "modal.emailPlaceholder": "jouw@email.com",
    "modal.button.submit": "AANMELDEN",
    "modal.button.submitting": "VERWERKEN...",
    "modal.button.close": "SLUITEN",
    "modal.success.title": "Je staat op de lijst",
    "modal.success.description": "We geven een seintje zodra MODEL 00:00 lanceert.",
    "modal.privacy": "Geen spam. Uitschrijven kan altijd.",
  },
};

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as Language | null;
      if (savedLanguage && (savedLanguage === "EN" || savedLanguage === "NL")) {
        setLanguageState(savedLanguage);
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0].toUpperCase();
        if (browserLang === "NL") {
          setLanguageState("NL");
        }
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, lang);
      setLanguageState(lang);
      // Update HTML lang attribute
      document.documentElement.lang = lang === "NL" ? "nl" : "en";
    }
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language === "NL" ? "nl" : "en";
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["EN"][key] || key;
  };

  return <LocalizationContext.Provider value={{ language, setLanguage, t }}>{children}</LocalizationContext.Provider>;
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}
