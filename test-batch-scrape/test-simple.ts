#!/usr/bin/env bun

// Simple test without schema extraction

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-YOUR_API_KEY'

if (FIRECRAWL_API_KEY === 'fc-YOUR_API_KEY') {
  console.error('Please set FIRECRAWL_API_KEY environment variable')
  process.exit(1)
}

const TEST_URLS = [
  'https://www.firecrawl.dev/blog/ai-powered-web-scraping-solutions-2025',
  'https://www.firecrawl.dev/blog/ai-resume-parser-job-matcher-python',
  'https://www.firecrawl.dev/blog/an-adventure-in-scaling'
]

async function testSimpleBatchScrape() {
  console.log('Testing SIMPLE Firecrawl batch scrape (no schema)...')
  console.log(`URLs to scrape: ${TEST_URLS.length}`)
  console.log('---')

  try {
    // Simple request - just markdown
    const requestBody = {
      urls: TEST_URLS,
      formats: ['markdown'],
      onlyMainContent: true
    }

    console.log('Request body:', JSON.stringify(requestBody, null, 2))

    const response = await fetch('https://api.firecrawl.dev/v1/batch/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('Raw response:', responseText)
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = JSON.parse(responseText)
    console.log('Parsed response:', JSON.stringify(result, null, 2))

    // If async, poll for results
    if (result.id && !result.data) {
      console.log(`\nJob ID: ${result.id}`)
      console.log('Waiting 5 seconds before checking status...')
      
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      const statusResponse = await fetch(`https://api.firecrawl.dev/v1/batch/scrape/${result.id}`, {
        headers: {
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
        }
      })
      
      const statusText = await statusResponse.text()
      console.log('\nStatus check response:', statusText)
      
      const status = JSON.parse(statusText)
      console.log('Status:', {
        status: status.status,
        total: status.total,
        completed: status.completed
      })
    }

  } catch (error) {
    console.error('\n❌ Error:', error)
  }
}

// Run the test
testSimpleBatchScrape()