import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.nurturecal.com/",
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: "https://www.nurturecal.com/privacy",
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: "https://www.nurturecal.com/terms",
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
