import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account-setup",
        "/api/",
        "/owner-guide/",
        "/project-status",
        "/questionaire",
        "/screen-previews"
      ]
    },
    sitemap: "https://www.nurturecal.com/sitemap.xml"
  };
}
