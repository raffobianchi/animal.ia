"use client";

import { useEffect, useRef } from "react";
import type L from "leaflet";
import type { VetWithDistance } from "~/lib/geo";

type Props = {
  vets: VetWithDistance[];
  center: { lat: number; lng: number };
  selectedVetId: string | null;
  onMarkerClick: (id: string) => void;
};

export function VetMap({ vets, center, selectedVetId, onMarkerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      await import("leaflet.markercluster");
      await import("leaflet.markercluster/dist/MarkerCluster.css");
      await import("leaflet.markercluster/dist/MarkerCluster.Default.css");

      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current).setView(
        [center.lat, center.lng],
        6,
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // markercluster augments L namespace
      const clusterGroup = (L as typeof L & { markerClusterGroup: () => L.LayerGroup }).markerClusterGroup();

      map.addLayer(clusterGroup);
      mapRef.current = map;
      markersRef.current = clusterGroup;
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers when vets change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    import("leaflet").then((L) => {
      const cluster = markersRef.current!;
      cluster.clearLayers();
      const newMap = new Map<string, L.Marker>();

      for (const vet of vets) {
        const isSelected = vet.id === selectedVetId;
        const icon = L.divIcon({
          className: `vet-marker${isSelected ? " selected" : ""}${vet.emergency ? " emergency" : ""}`,
          html: vet.emergency ? "🚨" : "🏥",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([vet.lat, vet.lng], { icon });
        marker.bindPopup(
          `<strong>${vet.name}</strong><br>${vet.address}, ${vet.city}`,
        );
        marker.on("click", () => onMarkerClick(vet.id));
        cluster.addLayer(marker);
        newMap.set(vet.id, marker);
      }

      markerMapRef.current = newMap;

      // Fit bounds if there are vets
      if (vets.length > 0) {
        const bounds = L.latLngBounds(vets.map((v) => [v.lat, v.lng]));
        mapRef.current!.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      }
    });
  }, [vets, selectedVetId, onMarkerClick]);

  // Pan to center when it changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], 12);
    }
  }, [center.lat, center.lng]);

  // Highlight selected marker
  useEffect(() => {
    if (!selectedVetId) return;
    const marker = markerMapRef.current.get(selectedVetId);
    if (marker) {
      marker.openPopup();
    }
  }, [selectedVetId]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Map"
      className="h-full min-h-[400px] w-full rounded-2xl"
    />
  );
}
