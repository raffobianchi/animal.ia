"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Input } from "~/components/ui/input";
import { inputBig } from "~/lib/ui";
import { geocodeSearch } from "~/lib/actions";

type GeoResult = { lat: number; lng: number; displayName: string };

type Props = {
  onLocationSelect: (lat: number, lng: number) => void;
  onGeolocationRequest: () => void;
  isGeolocationLoading: boolean;
};

export function VetSearchBar({
  onLocationSelect,
  onGeolocationRequest,
  isGeolocationLoading,
}: Props) {
  const t = useTranslations("vet");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced geocoding
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      const res = await geocodeSearch(query);
      setResults(res);
      setOpen(res.length > 0);
    }, 600);

    return () => clearTimeout(timerRef.current);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (result: GeoResult) => {
      setQuery(result.displayName.split(",")[0]);
      setOpen(false);
      onLocationSelect(result.lat, result.lng);
    },
    [onLocationSelect],
  );

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            className={inputBig}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls={open ? "vet-search-listbox" : undefined}
            role="combobox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {open && results.length > 0 && (
            <ul
              id="vet-search-listbox"
              role="listbox"
              className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-2xl border border-border/60 bg-card shadow-lg"
            >
              {results.map((r, i) => (
                <li key={i} role="option" aria-selected={false}>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-secondary/60"
                    onClick={() => handleSelect(r)}
                  >
                    {r.displayName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          onClick={onGeolocationRequest}
          disabled={isGeolocationLoading}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card text-xl transition-colors hover:bg-secondary/60 disabled:opacity-40"
          title={t("useMyLocation")}
          aria-label={t("useMyLocation")}
        >
          {isGeolocationLoading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            "📍"
          )}
        </button>
      </div>
    </div>
  );
}
