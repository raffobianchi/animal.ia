"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { VetSearchBar } from "~/components/VetSearchBar";
import { VetList } from "~/components/VetList";
import { searchVets } from "~/lib/actions";
import type { VetWithDistance } from "~/lib/geo";

const VetMap = dynamic(
  () => import("~/components/VetMap").then((m) => m.VetMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl bg-secondary/30">
        <span className="text-muted-foreground">⏳</span>
      </div>
    ),
  },
);

const RADIUS_OPTIONS = [10, 25, 50, 100];

type Props = {
  initialVets: VetWithDistance[];
};

export function VetSearchClient({ initialVets }: Props) {
  const t = useTranslations("vet");
  const [vets, setVets] = useState(initialVets);
  const [center, setCenter] = useState({ lat: 41.9028, lng: 12.4964 });
  const [selectedVetId, setSelectedVetId] = useState<string | null>(null);
  const [radiusKm, setRadiusKm] = useState(25);
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const doSearch = useCallback(
    async (lat: number, lng: number, radius: number) => {
      setCenter({ lat, lng });
      setHasSearched(true);
      const results = await searchVets({ lat, lng, radiusKm: radius });
      setVets(results);
    },
    [],
  );

  const handleLocationSelect = useCallback(
    (lat: number, lng: number) => {
      doSearch(lat, lng, radiusKm);
    },
    [doSearch, radiusKm],
  );

  const handleGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert(t("geolocationNotSupported"));
      return;
    }
    setIsGeolocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGeolocationLoading(false);
        doSearch(pos.coords.latitude, pos.coords.longitude, radiusKm);
      },
      () => {
        setIsGeolocationLoading(false);
        alert(t("geolocationError"));
      },
    );
  }, [doSearch, radiusKm, t]);

  const handleRadiusChange = useCallback(
    (newRadius: number) => {
      setRadiusKm(newRadius);
      if (hasSearched) {
        doSearch(center.lat, center.lng, newRadius);
      }
    },
    [doSearch, center, hasSearched],
  );

  const handleMarkerClick = useCallback((id: string) => {
    setSelectedVetId(id);
  }, []);

  const handleVetSelect = useCallback((id: string) => {
    setSelectedVetId(id);
  }, []);

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-warm md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          {/* Search bar + radius */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <VetSearchBar
              onLocationSelect={handleLocationSelect}
              onGeolocationRequest={handleGeolocation}
              isGeolocationLoading={isGeolocationLoading}
            />
            <div className="flex items-center gap-2">
              <label className="shrink-0 text-sm font-medium text-muted-foreground">
                {t("searchRadius")}:
              </label>
              <select
                value={radiusKm}
                onChange={(e) => handleRadiusChange(Number(e.target.value))}
                className="h-14 rounded-2xl border border-border/60 bg-card px-3 text-sm font-medium text-warm"
              >
                {RADIUS_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r} km
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Map + List grid */}
          <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
            {/* List (left on desktop, bottom on mobile) */}
            <div className="order-2 max-h-[600px] overflow-y-auto lg:order-1">
              <VetList
                vets={hasSearched ? vets : initialVets}
                selectedVetId={selectedVetId}
                onVetSelect={handleVetSelect}
              />
            </div>

            {/* Map (right on desktop, top on mobile) */}
            <div className="order-1 h-[400px] lg:order-2 lg:h-[600px]">
              <VetMap
                vets={hasSearched ? vets : initialVets}
                center={center}
                selectedVetId={selectedVetId}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
