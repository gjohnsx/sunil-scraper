import { NextRequest, NextResponse } from 'next/server'
import FirecrawlApp from '@mendable/firecrawl-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, limit = 200 } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.FIRECRAWL_API_KEY
    if (!apiKey || apiKey === 'fc-YOUR_API_KEY') {
      return NextResponse.json(
        { error: 'Firecrawl API key not configured' },
        { status: 500 }
      )
    }


    const app = new FirecrawlApp({ apiKey })

    // Map the website
    const mapResult = await app.mapUrl(url, {
      limit,
      includeSubdomains: false
    })


    // The mapUrl might return an object with a data property or other structure
    // Let's ensure we have an array
    let urls: string[] = []
    
    if (Array.isArray(mapResult)) {
      urls = mapResult
    } else if (mapResult && Array.isArray((mapResult as unknown as {data?: string[]}).data)) {
      urls = (mapResult as unknown as {data: string[]}).data
    } else if (mapResult && Array.isArray((mapResult as unknown as {links?: string[]}).links)) {
      urls = (mapResult as unknown as {links: string[]}).links
    } else if (mapResult && (mapResult as unknown as {success?: boolean; urls?: string[]}).success && Array.isArray((mapResult as unknown as {urls?: string[]}).urls)) {
      urls = (mapResult as unknown as {urls: string[]}).urls
    } else {
      urls = [] // Fallback to empty array
    }


    // Analyze the URLs
    const analysis = {
      total: urls.length,
      posts: urls.filter((u: string) => {
        try {
          const path = new URL(u).pathname
          return path.match(/\/[a-z0-9-]+$/) && 
                 !path.includes('/category/') &&
                 !path.includes('/tag/') &&
                 !path.includes('/page/')
        } catch {
          return false
        }
      }).length,
      categories: urls.filter((u: string) => u.includes('/category/')).length,
      tags: urls.filter((u: string) => u.includes('/tag/')).length,
      pages: urls.filter((u: string) => u.includes('/page/')).length
    }


    return NextResponse.json({
      success: true,
      urls,
      analysis,
      creditsUsed: 2 // Map always uses 2 credits
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to map website' },
      { status: 500 }
    )
  }
}