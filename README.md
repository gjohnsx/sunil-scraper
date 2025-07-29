# Firecrawl Content Migrator

A powerful web scraping and content migration tool built with Next.js, TypeScript, and the Firecrawl API. Extract structured data from any website and export it in formats ready for your CMS, database, or data pipeline.

## Features

- **Smart Website Mapping**: Analyze and visualize website structure with an interactive tree view
- **Selective URL Scraping**: Choose exactly which pages to scrape with intelligent filtering
- **Custom Data Schemas**: Define custom fields to extract specific content (title, date, author, etc.)
- **Batch Processing**: Efficiently scrape multiple URLs in a single operation
- **Multiple Export Formats**: Export to CSV, JSON, or custom formats
- **Real-time Progress**: Monitor scraping progress with live updates
- **Cost-Effective**: Uses Map + Batch Scrape strategy to minimize API credits

## Use Cases

- **Blog Migration**: Extract posts, metadata, and content from any blog platform
- **E-commerce Data**: Scrape product information, prices, and descriptions
- **News Archives**: Collect articles with dates, authors, and categories
- **Documentation Sites**: Extract technical documentation with proper structure
- **Content Audits**: Analyze and export existing website content

## Prerequisites

- Node.js 18+ and npm
- Firecrawl API key (get one at [firecrawl.dev](https://firecrawl.dev))

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd firecrawl-content-migrator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env.local` file:
   ```env
   FIRECRAWL_API_KEY=fc-YOUR_API_KEY_HERE
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## How It Works

### Step 1: Map Website Structure
Enter a URL to analyze the website's structure. The mapping operation discovers all available pages and organizes them in a hierarchical tree view. (Uses 2 API credits)

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

## API Endpoints

### POST /api/map
Maps website structure and returns discovered URLs
```json
{
  "url": "https://example.com/blog",
  "limit": 200
}
```

### POST /api/crawl
Extracts content from selected URLs with schema
```json
{
  "url": "https://example.com",
  "selectedUrls": ["url1", "url2"],
  "schema": {
    "properties": {
      "title": { "type": "string" },
      "date": { "type": "string" },
      "content": { "type": "string" }
    }
  }
}
```

## Advanced Features

### Smart URL Detection
The migrator intelligently identifies content patterns:
- Blog posts vs category pages
- Product pages vs listings
- Documentation vs navigation

### Schema Auto-Detection
Analyzes page content to suggest relevant fields:
- Detects prices, dates, authors
- Identifies metadata patterns
- Recognizes common content structures

### Efficient Credit Usage
Optimized strategy minimizes API costs:
- Map operation: 2 credits (one-time)
- Batch scrape: 1 credit per URL
- Example: 100 blog posts = 102 total credits

## Project Structure

```
firecrawl-content-migrator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── crawl/        # Content extraction endpoint
│   │   │   └── map/          # Website mapping endpoint
│   │   ├── page.tsx          # Main application UI
│   │   └── layout.tsx        # App layout
│   └── components/
│       ├── layout/           # Layout components
│       └── ui/               # Reusable UI components
├── public/                   # Static assets
└── package.json             # Dependencies
```

## Troubleshooting

### "Firecrawl API key not configured"
- Ensure `.env.local` exists with valid API key
- Restart dev server after adding key

### "Failed to map website"
- Verify URL is accessible
- Check API key has credits
- Try a different URL path

### Batch scraping fails
- App automatically falls back to individual scraping
- Check browser console for errors
- Verify selected URLs are valid

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

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Create an issue on GitHub
- Check [Firecrawl docs](https://docs.firecrawl.dev)
- Join [Firecrawl Discord](https://discord.gg/firecrawl)