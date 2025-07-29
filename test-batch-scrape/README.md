# Batch Scrape Test

This directory contains a simple test script to debug the Firecrawl batch scrape API.

## Usage

1. Make sure you have the FIRECRAWL_API_KEY environment variable set:
   ```bash
   export FIRECRAWL_API_KEY=fc-your-actual-api-key
   ```

2. Run the test script:
   ```bash
   bun run test-batch-scrape.ts
   ```

## What it tests

- Submits a batch scrape job with 3 URLs
- Uses the same JSON schema as the main app
- Polls for job completion
- Shows detailed logging at each step
- Helps identify if the issue is with:
  - API request format
  - Job ID handling
  - Status polling
  - Response parsing

## Expected output

The script should:
1. Submit the batch job and get a job ID
2. Poll the status endpoint until completion
3. Show the scraped data with the extracted schema fields