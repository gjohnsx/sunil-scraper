const fs = require('fs');
const path = require('path');

// Read the batch results
const results = JSON.parse(fs.readFileSync('batch_results.json', 'utf8'));

const scrapeDir = 'scraped_data/' + fs.readdirSync('scraped_data').sort().reverse()[0];
console.log(`Processing ${results.total} pages...`);
console.log(`Status: ${results.status}`);
console.log(`Credits used: ${results.creditsUsed}`);

// Create subdirectories
fs.mkdirSync(path.join(scrapeDir, 'markdown'), { recursive: true });
fs.mkdirSync(path.join(scrapeDir, 'json'), { recursive: true });
fs.mkdirSync(path.join(scrapeDir, 'metadata'), { recursive: true });

// Process each page
results.data.forEach((page, index) => {
  if (!page.metadata || !page.metadata.sourceURL) {
    console.log(`Skipping page ${index + 1} - no source URL`);
    return;
  }
  
  // Create a safe filename from the URL
  const url = new URL(page.metadata.sourceURL);
  const safeName = url.pathname
    .replace(/^\//, '')
    .replace(/\//g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '') || 'index';
  
  const fileBase = `${String(index + 1).padStart(3, '0')}_${safeName}`;
  
  // Save markdown if available
  if (page.markdown) {
    fs.writeFileSync(
      path.join(scrapeDir, 'markdown', `${fileBase}.md`),
      `# ${page.metadata.title || 'Untitled'}\n\nSource: ${page.metadata.sourceURL}\n\n---\n\n${page.markdown}`
    );
  }
  
  // Save JSON data if available
  if (page.json) {
    fs.writeFileSync(
      path.join(scrapeDir, 'json', `${fileBase}.json`),
      JSON.stringify(page.json, null, 2)
    );
  }
  
  // Save metadata
  fs.writeFileSync(
    path.join(scrapeDir, 'metadata', `${fileBase}_meta.json`),
    JSON.stringify(page.metadata, null, 2)
  );
});

// Create summary file
const summary = {
  scrapeId: 'bfe493f7-b4d7-411d-9428-ab4ee131a77f',
  timestamp: new Date().toISOString(),
  status: results.status,
  total: results.total,
  completed: results.completed,
  creditsUsed: results.creditsUsed,
  urls: results.data.map(p => p.metadata?.sourceURL).filter(Boolean)
};

fs.writeFileSync(
  path.join(scrapeDir, 'summary.json'),
  JSON.stringify(summary, null, 2)
);

// Create CSV with all data
const csvRows = ['URL,Title,Status Code'];
results.data.forEach(page => {
  if (page.metadata) {
    const row = [
      page.metadata.sourceURL || '',
      (page.metadata.title || '').replace(/,/g, ';'),
      page.metadata.statusCode || ''
    ].join(',');
    csvRows.push(row);
  }
});

fs.writeFileSync(
  path.join(scrapeDir, 'all_pages.csv'),
  csvRows.join('\n')
);

console.log(`\n✅ Saved ${results.completed} pages to ${scrapeDir}/`);
console.log(`   - Markdown files: ${scrapeDir}/markdown/`);
console.log(`   - JSON extracts: ${scrapeDir}/json/`);
console.log(`   - Metadata: ${scrapeDir}/metadata/`);
console.log(`   - Summary: ${scrapeDir}/summary.json`);
console.log(`   - CSV list: ${scrapeDir}/all_pages.csv`);