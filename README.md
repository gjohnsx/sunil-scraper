# Firecrawl Content Migrator

A powerful web scraping and content migration tool built with Next.js, TypeScript, and the Firecrawl API. Extract structured data from any website and export it in formats ready for your CMS, database, or data pipeline.

🔗 **Repository**: [github.com/mendableai/firecrawl-migrator](https://github.com/mendableai/firecrawl-migrator)

## Features

- **Smart Website Mapping**: Analyze and visualize website structure with an interactive tree view
- **Selective URL Scraping**: Choose exactly which pages to scrape with intelligent filtering
- **Custom Data Schemas**: Define custom fields to extract specific content (title, date, author, etc.)
- **Batch Processing**: Efficiently scrape multiple URLs in a single operation
- **Multiple Export Formats**: Export to CSV, JSON, or custom formats
- **Real-time Progress**: Monitor scraping progress with live updates
- **Cost-Effective**: Uses Map + Batch Scrape strategy for efficiency

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

### 1. Clone the repository
```bash
git clone https://github.com/mendableai/firecrawl-migrator.git
cd firecrawl-migrator
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
Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

Add your Firecrawl API key to the file:
```env
FIRECRAWL_API_KEY=fc-YOUR_ACTUAL_API_KEY_HERE
```

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

## Troubleshooting

If you see **"Firecrawl API key not configured"**:
- Make sure you created the `.env.local` file
- Check that your API key starts with `fc-`
- Restart the development server

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

Just fork, make your changes, and submit a PR!

## License

MIT License - see LICENSE file for details

## Support

- Create an issue on GitHub
- Check [Firecrawl docs](https://docs.firecrawl.dev)
- Join [Firecrawl Discord](https://discord.gg/firecrawl)