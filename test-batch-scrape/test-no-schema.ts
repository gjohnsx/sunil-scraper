#!/usr/bin/env bun

// Test batch scrape without schema to see if all URLs work

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-YOUR_API_KEY'

if (FIRECRAWL_API_KEY === 'fc-YOUR_API_KEY') {
  process.stderr.write('Please set FIRECRAWL_API_KEY environment variable\n')
  process.exit(1)
}

const TEST_URLS = [
  'https://www.firecrawl.dev/blog/ai-powered-web-scraping-solutions-2025',
  'https://www.firecrawl.dev/blog/ai-resume-parser-job-matcher-python',
  'https://www.firecrawl.dev/blog/an-adventure-in-scaling'
]

async function testBatchScrapeNoSchema() {

  try {
    const requestBody = {
      urls: TEST_URLS,
      formats: ['markdown'],
      onlyMainContent: true,
      timeout: 60000
    }


    const response = await fetch('https://api.firecrawl.dev/v1/batch/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()

    if (!result.id) {
      throw new Error('No job ID in response')
    }

    // Poll for completion
    
    let attempts = 0
    const maxAttempts = 20
    let jobStatus: any = {}

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      const statusResponse = await fetch(`https://api.firecrawl.dev/v1/batch/scrape/${result.id}`, {
        headers: {
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
        }
      })

      jobStatus = await statusResponse.json()
      attempts++


      if (jobStatus.status === 'completed') {
        
        return jobStatus
      }

      if (jobStatus.status === 'failed') {
        throw new Error('Job failed')
      }
    }

    throw new Error('Job timed out')

  } catch (error) {
    throw error
  }
}

// Run the test
testBatchScrapeNoSchema()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))