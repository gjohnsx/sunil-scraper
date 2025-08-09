# Sunil Scraper

A web scraping and content extraction tool built with Next.js and the Firecrawl API. Forked from [Firecrawl's Content Migrator](https://github.com/mendableai/firecrawl-migrator) with enhancements for batch processing and improved data export capabilities.

> ⚠️ **WARNING**: This tool requires a Firecrawl API key. The default placeholder `fc-YOUR_API_KEY` will NOT work. You must obtain your own API key from [firecrawl.dev](https://firecrawl.dev).

## What's Changed from Original

This fork includes several enhancements over the original Firecrawl Content Migrator:

- **Improved batch processing**: Better error handling and fallback mechanisms for large-scale scraping operations
- **Enhanced data export**: Additional export formats and improved CSV generation with proper encoding
- **Schema inference**: Smarter automatic field detection based on content patterns (prices, dates, authors, etc.)
- **UI improvements**: Better tree view for URL selection, collapsible JSON viewer, and clearer workflow steps
- **Session management**: Tracks scraping sessions with detailed metadata and results
- **Robust extraction**: Dual-format processing (Markdown + HTML) for more reliable data extraction

## Key Features

- 🗺️ **Website Mapping**: Automatically discover and categorize all pages on a site
- 🎯 **Selective Scraping**: Choose specific URLs or patterns to extract
- 📊 **Smart Schema Detection**: Auto-detects common fields like prices, dates, and authors
- 💾 **Multiple Export Formats**: CSV, JSON, and structured data ready for migration
- ⚡ **Batch Processing**: Handle hundreds of pages efficiently with progress tracking
- 🔄 **Fallback Mechanisms**: Automatic retry and individual request fallback on failures

## Prerequisites

- Node.js 18+ and npm
- Firecrawl API key (get one at [firecrawl.dev](https://firecrawl.dev))

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/gjohnsx/sunil-scraper.git
cd sunil-scraper
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get your Firecrawl API key
- Sign up at [firecrawl.dev](https://firecrawl.dev)
- Navigate to your dashboard
- Copy your API key

### 4. Configure environment variables

⚠️ **CRITICAL**: You MUST add your own Firecrawl API key. The application will not work without it!

Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

Add your Firecrawl API key to the file:
```env
FIRECRAWL_API_KEY=fc-YOUR_ACTUAL_API_KEY_HERE
```

Replace `fc-YOUR_ACTUAL_API_KEY_HERE` with your actual API key from [firecrawl.dev](https://firecrawl.dev)

### 5. Run the development server
```bash
npm run dev
```

### 6. Open the application
Visit [http://localhost:3000](http://localhost:3000) in your browser

You should see the Firecrawl Content Migrator interface. If you see an API key error, double-check your `.env.local` file.

## How It Works

### Step 1: Map Website Structure
Enter a URL to analyze the website's structure. The mapping operation discovers all available pages and organizes them in a hierarchical tree view.

### Step 2: Select Content
Browse the interactive tree and select which pages to scrape. Use the built-in filters to:
- Select all pages in a directory
- Filter by URL patterns
- Exclude categories, tags, or pagination

### Step 3: Define Schema
Configure what data to extract from each page:
- **Default fields**: title, date, content
- **Add custom fields**: author, category, price, tags, etc.
- **Auto-detection**: The tool can analyze pages and suggest fields

### Step 4: Extract & Export
Start the batch scraping process to extract structured data from all selected pages. Export results as:
- CSV for spreadsheets and databases
- JSON for APIs and applications
- Custom formats for specific CMS platforms

## Common Issues & Warnings

### ⚠️ Default API Key Won't Work
The repository includes a placeholder API key (`fc-YOUR_API_KEY`) that **will not function**. You must:
1. Sign up at [firecrawl.dev](https://firecrawl.dev)
2. Get your personal API key
3. Replace the placeholder in `.env.local`

### API Rate Limits
Be aware of Firecrawl's rate limits:
- Free tier has limited requests per month
- Large batch operations may consume credits quickly
- Monitor your usage on the Firecrawl dashboard

### Troubleshooting

If you see **"Firecrawl API key not configured"**:
- You haven't replaced the placeholder API key
- Make sure `.env.local` exists and contains your real API key
- Verify your API key starts with `fc-`
- Restart the development server after adding the key

## Development

### Build for production
```bash
npm run build
npm start
```

### Run linting
```bash
npm run lint
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI**: shadcn/ui components + Tailwind CSS
- **API**: Firecrawl SDK for web scraping
- **State**: React hooks for client-side state management

## Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch
- Submit a pull request

## Credits

- Original repository: [Firecrawl Content Migrator](https://github.com/mendableai/firecrawl-migrator) by Mendable AI
- Firecrawl API: [firecrawl.dev](https://firecrawl.dev)

## License

MIT License - see LICENSE file for details

## Support

- Open an issue on [GitHub](https://github.com/gjohnsx/sunil-scraper/issues)
- Check [Firecrawl docs](https://docs.firecrawl.dev) for API documentation
- Original project: [Firecrawl Discord](https://discord.gg/firecrawl)