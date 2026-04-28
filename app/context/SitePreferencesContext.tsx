"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type SitePreferencesContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const STORAGE_KEY = "site-locale";
const DEFAULT_LOCALE: Locale = "fr";

export type Locale = "fr" | "en";

const SitePreferencesContext = createContext<SitePreferencesContextValue | undefined>(undefined);

const isLocale = (value: string | null): value is Locale => value === "fr" || value === "en";

const getStoredLocale = (): Locale | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : null;
};

const buildUrl = (pathname: string, searchParams: URLSearchParams, locale: Locale) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("lang", locale);
  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
};

export function SitePreferencesProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
const [mounted, setMounted] = useState(false);

  const updateUrl = useCallback(
    (nextLocale: Locale) => {
      const newUrl = buildUrl(pathname, new URLSearchParams(searchParams.toString()), nextLocale);
      window.history.replaceState(null, "", newUrl);
    },
    [pathname, searchParams],
  );

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        return;
      }

      setLocaleState(nextLocale);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, nextLocale);
        updateUrl(nextLocale);
      }
    },
    [locale, updateUrl],
  );

useEffect(() => {
  const paramLocale = isLocale(searchParams.get("lang"))
    ? (searchParams.get("lang") as Locale)
    : null;

  const storedLocale = getStoredLocale();
  const resolvedLocale = paramLocale ?? storedLocale ?? DEFAULT_LOCALE;

  setLocaleState(resolvedLocale);
  setMounted(true);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, resolvedLocale);
    document.documentElement.lang = resolvedLocale;

    if (!paramLocale || paramLocale !== resolvedLocale) {
      updateUrl(resolvedLocale);
    }
  }
}, [searchParams, updateUrl]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);

  if (!context) {
    throw new Error("useSitePreferences must be used within a SitePreferencesProvider");
  }

  return context;
}
