import type { MetadataRoute } from "next";
import { BASE_URL } from "~/lib/constants";

const locales = ["it", "en"] as const;
const defaultLocale = "it";

const routes = [
  "/",
  "/blog",
  "/shop",
  "/vet",
  "/login",
  "/onboarding",
  "/privacy",
  "/terms",
  "/cookies",
  "/gdpr",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => {
    const path = route === "/" ? "" : route;
    return {
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale,
            locale === defaultLocale
              ? `${BASE_URL}${path}`
              : `${BASE_URL}/${locale}${path}`,
          ]),
        ),
      },
    };
  });
}
