import { NextRequest, NextResponse } from "next/server";
import FirecrawlApp from "@mendable/firecrawl-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, limit = 300, excludePaths = [] } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey || apiKey === "fc-YOUR_API_KEY") {
      return NextResponse.json(
        { error: "Firecrawl API key not configured" },
        { status: 500 },
      );
    }

    const app = new FirecrawlApp({ apiKey });

    // Map the website with exclude paths if provided
    const mapOptions: Parameters<typeof app.mapUrl>[1] = {
      limit,
      includeSubdomains: false,
    };

    // Add excludePaths if provided (Firecrawl may support this)
    if (excludePaths && excludePaths.length > 0) {
      (mapOptions as any).excludePaths = excludePaths;
    }

    const mapResult = await app.mapUrl(url, mapOptions);

    // The mapUrl might return an object with a data property or other structure
    // Let's ensure we have an array
    let urls: string[] = [];

    if (Array.isArray(mapResult)) {
      urls = mapResult;
    } else if (
      mapResult &&
      Array.isArray((mapResult as unknown as { data?: string[] }).data)
    ) {
      urls = (mapResult as unknown as { data: string[] }).data;
    } else if (
      mapResult &&
      Array.isArray((mapResult as unknown as { links?: string[] }).links)
    ) {
      urls = (mapResult as unknown as { links: string[] }).links;
    } else if (
      mapResult &&
      (mapResult as unknown as { success?: boolean; urls?: string[] })
        .success &&
      Array.isArray((mapResult as unknown as { urls?: string[] }).urls)
    ) {
      urls = (mapResult as unknown as { urls: string[] }).urls;
    } else {
      urls = []; // Fallback to empty array
    }

    // Filter out excluded paths from the results if Firecrawl doesn't handle it
    let filteredUrls = urls;
    if (excludePaths && excludePaths.length > 0) {
      filteredUrls = urls.filter((u: string) => {
        try {
          const urlPath = new URL(u).pathname;
          // Check if the URL path starts with any of the excluded paths
          return !excludePaths.some((excludePath: string) => {
            // Handle wildcards
            if (excludePath.endsWith("*")) {
              const pathPrefix = excludePath.slice(0, -1);
              return urlPath.startsWith(pathPrefix);
            }
            return (
              urlPath === excludePath || urlPath.startsWith(excludePath + "/")
            );
          });
        } catch {
          return true; // Keep URLs that can't be parsed
        }
      });
    }

    // Analyze the URLs
    const analysis = {
      total: filteredUrls.length,
      posts: filteredUrls.filter((u: string) => {
        try {
          const path = new URL(u).pathname;
          return (
            path.match(/\/[a-z0-9-]+$/) &&
            !path.includes("/category/") &&
            !path.includes("/tag/") &&
            !path.includes("/page/")
          );
        } catch {
          return false;
        }
      }).length,
      categories: filteredUrls.filter((u: string) => u.includes("/category/"))
        .length,
      tags: filteredUrls.filter((u: string) => u.includes("/tag/")).length,
      pages: filteredUrls.filter((u: string) => u.includes("/page/")).length,
    };

    return NextResponse.json({
      success: true,
      urls: filteredUrls,
      analysis,
      creditsUsed: 2, // Map always uses 2 credits
      excludedPaths: excludePaths, // Return what was excluded for transparency
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to map website",
      },
      { status: 500 },
    );
  }
}
