# Using Map + Crawl in Firecrawl UI (Playground)

Yes! You can use all these strategies in the Firecrawl Playground at https://www.firecrawl.dev/playground

## 1. Map in the UI

1. Go to the **Map** tab in the playground
2. Enter the blog URL: `https://example.com/blog`
3. Set options:
   - **Limit**: 200 (to discover all blog URLs)
   - **Search** (optional): "blog" or "post"
4. Click **Map Website**
5. You'll get a list of all URLs that you can export

## 2. Crawl in the UI

1. Go to the **Crawl** tab
2. Enter the blog URL: `https://example.com/blog`
3. Configure options:
   - **Max Pages to Crawl**: 100
   - **Max Depth**: 1
   - **Include Paths**: `/blog/*` (click "Add Pattern")
   - **Exclude Paths**: 
     - `/blog/category/*`
     - `/blog/tag/*`
     - `/blog/author/*`
   - **Only Main Content**: ✓ (checked)
4. Click **Start Crawling**

## 3. Extract in the UI

1. Go to the **Extract** tab
2. Enter blog post URLs (you can paste multiple)
3. Write your extraction prompt:
   ```
   Extract the complete blog post information including:
   - Title
   - Publication date
   - Author name
   - Full article content
   - Category/tags
   ```
4. Define your schema using the visual builder
5. Click **Extract**

## 4. Batch Scrape in the UI

1. Go to the **Batch** tab
2. Paste your list of blog URLs (one per line)
3. Configure options:
   - **Formats**: Markdown
   - **Only Main Content**: ✓
4. Click **Start Batch Scrape**

## UI Advantages

- **Visual Results**: See the content immediately
- **Export Options**: Download as JSON, CSV, or Markdown
- **No Code Required**: Perfect for non-developers
- **Credit Preview**: See how many credits will be used before running
- **Real-time Progress**: Watch the crawl/scrape progress

## Pro Tips for UI Usage

1. **Start Small**: Test with 5-10 URLs first
2. **Use Map First**: Always map to understand the site structure
3. **Preview Results**: The UI shows a preview before using credits
4. **Save Configurations**: You can save and reuse your crawl settings
5. **Check Credit Usage**: The UI shows credits required before execution

## Example Workflow in UI

1. **Map** the blog (2 credits) → Export URL list
2. **Filter** URLs in a spreadsheet
3. **Batch Scrape** or **Extract** the filtered URLs
4. **Export** results as JSON or CSV

Total: Same ~102 credits for 100 blog posts!