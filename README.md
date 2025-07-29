# Firecrawl Style Guide & Content Migrator

A modern web scraping and content migration tool built with Next.js, TypeScript, and Firecrawl API. This application provides a clean interface for analyzing websites, scraping content, and migrating data with customizable schemas.

## Features

- **Website Analysis**: Map and analyze website structure with visual tree view
- **Smart URL Selection**: Intelligently filter and select URLs for scraping
- **Batch Scraping**: Efficient batch processing of selected URLs
- **Custom Schema**: Define custom fields for content extraction
- **CSV Export**: Export scraped data in CSV format
- **Modern UI**: Clean, responsive interface with Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- Firecrawl API key (get one at [firecrawl.dev](https://firecrawl.dev))

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fc-style-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   FIRECRAWL_API_KEY=fc-YOUR_API_KEY_HERE
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### 1. Analyze a Website
- Enter a website URL in the input field
- Click "Analyze Website" to map the site structure
- The application uses 2 Firecrawl credits for mapping

### 2. Select URLs
- Review the mapped URLs in the tree view
- Use the selection tools to choose URLs for scraping
- Selected URLs are highlighted in orange

### 3. Configure Schema (Optional)
- Click "Configure Schema" to add custom fields
- Default fields include: title, date, and content
- Add fields like author, category, or any custom field

### 4. Start Scraping
- Click "Start Scraping" to begin the batch process
- Each URL uses 1 Firecrawl credit
- Progress is displayed in real-time

### 5. Export Data
- Once complete, click "Export as CSV" to download
- Data includes all configured schema fields

## Project Structure

```
fc-style-guide/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── crawl/        # Crawl/scrape endpoint
│   │   │   └── map/          # Website mapping endpoint
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main application
│   └── components/
│       ├── layout/           # Layout components
│       └── ui/               # UI components
├── public/                   # Static assets
├── .env.local               # Environment variables
└── package.json             # Dependencies
```

## API Endpoints

### POST /api/map
Maps a website and returns all discovered URLs
- Body: `{ url: string, limit?: number }`
- Returns: `{ urls: string[], analysis: object }`

### POST /api/crawl
Scrapes content from selected URLs
- Body: `{ url: string, selectedUrls: string[], schema?: object }`
- Returns: `{ data: object[], creditsUsed: number }`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Firecrawl API**: Web scraping engine
- **Lucide Icons**: Modern icon library

## Development

### Code Style
- No emojis in code or UI
- Clean, professional interface
- Consistent color palette (orange-500/600, zinc shades)
- Maintain established spacing patterns

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm start
```

## Troubleshooting

### Common Issues

1. **"Firecrawl API key not configured"**
   - Ensure `.env.local` file exists with valid API key
   - Restart the development server after adding the key

2. **"Failed to map website"**
   - Check if the website URL is valid and accessible
   - Verify your Firecrawl API key has sufficient credits

3. **Batch scraping fails**
   - The application automatically falls back to individual URL scraping
   - Check console for specific error messages

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Create an issue in the GitHub repository
- Check Firecrawl documentation at [docs.firecrawl.dev](https://docs.firecrawl.dev)
# firecrawl-migrator
# firecrawl-migrator
