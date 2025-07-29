#!/usr/bin/env bun

// Test Firecrawl batch scrape API directly

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

async function testBatchScrape() {
  console.log('Testing Firecrawl batch scrape API...')
  console.log(`URLs to scrape: ${TEST_URLS.length}`)
  console.log('URLs:', TEST_URLS)
  console.log('---')

  try {
    // Step 1: Submit batch scrape job
    console.log('1. Submitting batch scrape job...')
    
    const requestBody = {
      urls: TEST_URLS,
      formats: ['markdown', 'json'],
      onlyMainContent: true,
      timeout: 60000,
      jsonOptions: {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Article title'
            },
            date: {
              type: 'string',
              description: 'Publication date'
            },
            content: {
              type: 'string',
              description: 'Main article content'
            }
          },
          required: ['title', 'date', 'content']
        },
        prompt: 'Extract the article data according to the schema'
      }
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
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()
    console.log('Initial response:', JSON.stringify(result, null, 2))
    console.log('---')

    // Check if it's a synchronous response (has data) or async (has id)
    if (result.data) {
      console.log('Synchronous response received!')
      console.log(`Got ${result.data.length} results immediately`)
      return result
    }

    if (!result.id) {
      throw new Error('No job ID in response')
    }

    // Step 2: Poll for job completion
    console.log(`2. Job ID: ${result.id}`)
    console.log('Polling for completion...')
    
    let attempts = 0
    const maxAttempts = 60
    let jobStatus: any = {}

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5 seconds
      
      const statusUrl = `https://api.firecrawl.dev/v1/batch/scrape/${result.id}`
      console.log(`\nChecking status at: ${statusUrl}`)
      
      const statusResponse = await fetch(statusUrl, {
        headers: {
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
        }
      })

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text()
        console.error('Status check error:', errorText)
        throw new Error(`Status check failed with status ${statusResponse.status}`)
      }

      jobStatus = await statusResponse.json()
      attempts++

      console.log(`Attempt ${attempts}/${maxAttempts}:`, {
        status: jobStatus.status,
        completed: jobStatus.completed,
        total: jobStatus.total,
        ...(jobStatus.expiresAt && { expiresAt: jobStatus.expiresAt })
      })

      if (jobStatus.status === 'completed') {
        console.log('\n✅ Job completed successfully!')
        console.log(`Total scraped: ${jobStatus.total}`)
        console.log(`Data items: ${jobStatus.data?.length || 0}`)
        
        // Show first result as example
        if (jobStatus.data && jobStatus.data.length > 0) {
          console.log('\nFirst result example:')
          console.log(JSON.stringify(jobStatus.data[0], null, 2))
        }
        
        return jobStatus
      }

      if (jobStatus.status === 'failed') {
        throw new Error('Job failed: ' + (jobStatus.error || 'Unknown error'))
      }
    }

    throw new Error('Job timed out after ' + maxAttempts + ' attempts')

  } catch (error) {
    console.error('\n❌ Error:', error)
    throw error
  }
}

// Run the test
testBatchScrape()
  .then(() => {
    console.log('\n✅ Test completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error)
    process.exit(1)
  })