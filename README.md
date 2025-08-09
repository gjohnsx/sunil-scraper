# Sunil Scraper

Web scraper built with Next.js and Firecrawl API. Forked from [Firecrawl Content Migrator](https://github.com/mendableai/firecrawl-migrator).

## What's New

- Added exclude paths dropdown for filtering URLs during mapping (e.g., filter out /tag/*, /category/*, pagination)
- Better batch processing with automatic fallbacks

## Features

- Map website structure
- Select URLs to scrape  
- Auto-detect schema fields
- Export as CSV/JSON

## Setup

```bash
# Clone
git clone https://github.com/gjohnsx/sunil-scraper.git
cd sunil-scraper

# Install
npm install

# Add your API key (get from firecrawl.dev)
echo "FIRECRAWL_API_KEY=fc-YOUR_KEY_HERE" > .env.local

# Run
npm run dev
```

Open http://localhost:3000

## Usage

1. Enter URL to map site
2. Use exclude dropdown to filter unwanted paths
3. Select pages to scrape
4. Configure fields (or use auto-detect)
5. Export data

## Build

```bash
npm run build
npm start
```

## License

MIT