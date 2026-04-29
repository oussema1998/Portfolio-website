"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Locale = "fr" | "en";

const STORAGE_KEY = "site-locale";
const DEFAULT_LOCALE: Locale = "fr";

const isLocale = (value: string | null): value is Locale =>
  value === "fr" || value === "en";

const getStoredLocale = (): Locale | null => {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : null;
};

const SitePreferencesContext = createContext<any>(undefined);

export function SitePreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  const updateUrl = useCallback((nextLocale: Locale) => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);

    window.history.replaceState(null, "", url.toString());
  }, []);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;

      setLocaleState(nextLocale);

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, nextLocale);
        updateUrl(nextLocale);
        document.documentElement.lang = nextLocale;
      }
    },
    [locale, updateUrl]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const paramLocale = isLocale(params.get("lang"))
      ? (params.get("lang") as Locale)
      : null;

    const storedLocale = getStoredLocale();
    const resolvedLocale =
      paramLocale ?? storedLocale ?? DEFAULT_LOCALE;

    setLocaleState(resolvedLocale);

    localStorage.setItem(STORAGE_KEY, resolvedLocale);
    document.documentElement.lang = resolvedLocale;
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);

  if (!context) {
    throw new Error(
      "useSitePreferences must be used within a SitePreferencesProvider"
    );
  }

  return context;
}