import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://sorce.jobs";

const publicPaths = ["/", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-20");
  return publicPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));
}
