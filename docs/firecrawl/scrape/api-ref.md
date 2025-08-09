# Crawl

## OpenAPI

````yaml v1-openapi POST /crawl
paths:
  path: /crawl
  method: post
  servers:
    - url: https://api.firecrawl.dev/v1
  request:
    security:
      - title: bearerAuth
        parameters:
          query: {}
          header:
            Authorization:
              type: http
              scheme: bearer
          cookie: {}
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              url:
                allOf:
                  - type: string
                    format: uri
                    description: The base URL to start crawling from
              excludePaths:
                allOf:
                  - type: array
                    items:
                      type: string
                    description: >-
                      URL pathname regex patterns that exclude matching URLs
                      from the crawl. For example, if you set "excludePaths":
                      ["blog/.*"] for the base URL firecrawl.dev, any results
                      matching that pattern will be excluded, such as
                      https://www.firecrawl.dev/blog/firecrawl-launch-week-1-recap.
              includePaths:
                allOf:
                  - type: array
                    items:
                      type: string
                    description: >-
                      URL pathname regex patterns that include matching URLs in
                      the crawl. Only the paths that match the specified
                      patterns will be included in the response. For example, if
                      you set "includePaths": ["blog/.*"] for the base URL
                      firecrawl.dev, only results matching that pattern will be
                      included, such as
                      https://www.firecrawl.dev/blog/firecrawl-launch-week-1-recap.
              maxDepth:
                allOf:
                  - type: integer
                    description: >-
                      Maximum absolute depth to crawl from the base of the
                      entered URL. Basically, the max number of slashes the
                      pathname of a scraped URL may contain.
                    default: 10
              maxDiscoveryDepth:
                allOf:
                  - type: integer
                    description: >-
                      Maximum depth to crawl based on discovery order. The root
                      site and sitemapped pages has a discovery depth of 0. For
                      example, if you set it to 1, and you set ignoreSitemap,
                      you will only crawl the entered URL and all URLs that are
                      linked on that page.
              ignoreSitemap:
                allOf:
                  - type: boolean
                    description: Ignore the website sitemap when crawling
                    default: false
              ignoreQueryParameters:
                allOf:
                  - type: boolean
                    description: >-
                      Do not re-scrape the same path with different (or none)
                      query parameters
                    default: false
              limit:
                allOf:
                  - type: integer
                    description: Maximum number of pages to crawl. Default limit is 10000.
                    default: 10000
              allowBackwardLinks:
                allOf:
                  - type: boolean
                    description: >-
                      ⚠️ DEPRECATED: Use 'crawlEntireDomain' instead. Allows the
                      crawler to follow internal links to sibling or parent
                      URLs, not just child paths.
                    default: false
                    deprecated: true
              crawlEntireDomain:
                allOf:
                  - type: boolean
                    description: >-
                      Allows the crawler to follow internal links to sibling or
                      parent URLs, not just child paths.


                      false: Only crawls deeper (child) URLs.

                      → e.g. /features/feature-1 → /features/feature-1/tips ✅

                      → Won't follow /pricing or / ❌


                      true: Crawls any internal links, including siblings and
                      parents.

                      → e.g. /features/feature-1 → /pricing, /, etc. ✅


                      Use true for broader internal coverage beyond nested
                      paths.
                    default: false
              allowExternalLinks:
                allOf:
                  - type: boolean
                    description: Allows the crawler to follow links to external websites.
                    default: false
              allowSubdomains:
                allOf:
                  - type: boolean
                    description: >-
                      Allows the crawler to follow links to subdomains of the
                      main domain.
                    default: false
              delay:
                allOf:
                  - type: number
                    description: >-
                      Delay in seconds between scrapes. This helps respect
                      website rate limits.
              maxConcurrency:
                allOf:
                  - type: integer
                    description: >-
                      Maximum number of concurrent scrapes. This parameter
                      allows you to set a concurrency limit for this crawl. If
                      not specified, the crawl adheres to your team's
                      concurrency limit.
              webhook:
                allOf:
                  - type: object
                    description: A webhook specification object.
                    properties:
                      url:
                        type: string
                        description: >-
                          The URL to send the webhook to. This will trigger for
                          crawl started (crawl.started), every page crawled
                          (crawl.page) and when the crawl is completed
                          (crawl.completed or crawl.failed). The response will
                          be the same as the `/scrape` endpoint.
                      headers:
                        type: object
                        description: Headers to send to the webhook URL.
                        additionalProperties:
                          type: string
                      metadata:
                        type: object
                        description: >-
                          Custom metadata that will be included in all webhook
                          payloads for this crawl
                        additionalProperties: true
                      events:
                        type: array
                        description: >-
                          Type of events that should be sent to the webhook URL.
                          (default: all)
                        items:
                          type: string
                          enum:
                            - completed
                            - page
                            - failed
                            - started
                    required:
                      - url
              scrapeOptions:
                allOf:
                  - $ref: '#/components/schemas/ScrapeOptions'
              zeroDataRetention:
                allOf:
                  - type: boolean
                    default: false
                    description: >-
                      If true, this will enable zero data retention for this
                      crawl. To enable this feature, please contact
                      help@firecrawl.dev
            required: true
            requiredProperties:
              - url
        examples:
          example:
            value:
              url: <string>
              excludePaths:
                - <string>
              includePaths:
                - <string>
              maxDepth: 10
              maxDiscoveryDepth: 123
              ignoreSitemap: false
              ignoreQueryParameters: false
              limit: 10000
              allowBackwardLinks: false
              crawlEntireDomain: false
              allowExternalLinks: false
              allowSubdomains: false
              delay: 123
              maxConcurrency: 123
              webhook:
                url: <string>
                headers: {}
                metadata: {}
                events:
                  - completed
              scrapeOptions:
                onlyMainContent: true
                includeTags:
                  - <string>
                excludeTags:
                  - <string>
                maxAge: 0
                headers: {}
                waitFor: 0
                mobile: false
                skipTlsVerification: false
                timeout: 30000
                parsePDF: true
                jsonOptions:
                  schema: {}
                  systemPrompt: <string>
                  prompt: <string>
                actions:
                  - type: wait
                    milliseconds: 2
                    selector: '#my-element'
                location:
                  country: US
                  languages:
                    - en-US
                removeBase64Images: true
                blockAds: true
                proxy: basic
                storeInCache: true
                formats:
                  - markdown
                changeTrackingOptions:
                  modes:
                    - git-diff
                  schema: {}
                  prompt: <string>
                  tag: null
              zeroDataRetention: false
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - type: boolean
              id:
                allOf:
                  - type: string
              url:
                allOf:
                  - type: string
                    format: uri
            refIdentifier: '#/components/schemas/CrawlResponse'
        examples:
          example:
            value:
              success: true
              id: <string>
              url: <string>
        description: Successful response
    '402':
      application/json:
        schemaArray:
          - type: object
            properties:
              error:
                allOf:
                  - type: string
                    example: Payment required to access this resource.
        examples:
          example:
            value:
              error: Payment required to access this resource.
        description: Payment required
    '429':
      application/json:
        schemaArray:
          - type: object
            properties:
              error:
                allOf:
                  - type: string
                    example: >-
                      Request rate limit exceeded. Please wait and try again
                      later.
        examples:
          example:
            value:
              error: Request rate limit exceeded. Please wait and try again later.
        description: Too many requests
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              error:
                allOf:
                  - type: string
                    example: An unexpected error occurred on the server.
        examples:
          example:
            value:
              error: An unexpected error occurred on the server.
        description: Server error
  deprecated: false
  type: path
components:
  schemas:
    BaseScrapeOptions:
      type: object
      properties:
        onlyMainContent:
          type: boolean
          description: >-
            Only return the main content of the page excluding headers, navs,
            footers, etc.
          default: true
        includeTags:
          type: array
          items:
            type: string
          description: Tags to include in the output.
        excludeTags:
          type: array
          items:
            type: string
          description: Tags to exclude from the output.
        maxAge:
          type: integer
          description: >-
            Returns a cached version of the page if it is younger than this age
            in milliseconds. If a cached version of the page is older than this
            value, the page will be scraped. If you do not need extremely fresh
            data, enabling this can speed up your scrapes by 500%. Defaults to
            0, which disables caching.
          default: 0
        headers:
          type: object
          description: >-
            Headers to send with the request. Can be used to send cookies,
            user-agent, etc.
        waitFor:
          type: integer
          description: >-
            Specify a delay in milliseconds before fetching the content,
            allowing the page sufficient time to load.
          default: 0
        mobile:
          type: boolean
          description: >-
            Set to true if you want to emulate scraping from a mobile device.
            Useful for testing responsive pages and taking mobile screenshots.
          default: false
        skipTlsVerification:
          type: boolean
          description: Skip TLS certificate verification when making requests
          default: false
        timeout:
          type: integer
          description: Timeout in milliseconds for the request
          default: 30000
        parsePDF:
          type: boolean
          description: >-
            Controls how PDF files are processed during scraping. When true, the
            PDF content is extracted and converted to markdown format, with
            billing based on the number of pages (1 credit per page). When
            false, the PDF file is returned in base64 encoding with a flat rate
            of 1 credit total.
          default: true
        jsonOptions:
          type: object
          description: JSON options object
          properties:
            schema:
              type: object
              description: >-
                The schema to use for the extraction (Optional). Must conform to
                [JSON Schema](https://json-schema.org/).
            systemPrompt:
              type: string
              description: The system prompt to use for the extraction (Optional)
            prompt:
              type: string
              description: The prompt to use for the extraction without a schema (Optional)
        actions:
          type: array
          description: Actions to perform on the page before grabbing the content
          items:
            oneOf:
              - type: object
                title: Wait
                properties:
                  type:
                    type: string
                    enum:
                      - wait
                    description: Wait for a specified amount of milliseconds
                  milliseconds:
                    type: integer
                    minimum: 1
                    description: Number of milliseconds to wait
                  selector:
                    type: string
                    description: Query selector to find the element by
                    example: '#my-element'
                required:
                  - type
              - type: object
                title: Screenshot
                properties:
                  type:
                    type: string
                    enum:
                      - screenshot
                    description: >-
                      Take a screenshot. The links will be in the response's
                      `actions.screenshots` array.
                  fullPage:
                    type: boolean
                    description: >-
                      Whether to capture a full-page screenshot or limit to the
                      current viewport.
                    default: false
                  quality:
                    type: integer
                    description: >-
                      The quality of the screenshot, from 1 to 100. 100 is the
                      highest quality.
                required:
                  - type
              - type: object
                title: Click
                properties:
                  type:
                    type: string
                    enum:
                      - click
                    description: Click on an element
                  selector:
                    type: string
                    description: Query selector to find the element by
                    example: '#load-more-button'
                  all:
                    type: boolean
                    description: >-
                      Clicks all elements matched by the selector, not just the
                      first one. Does not throw an error if no elements match
                      the selector.
                    default: false
                required:
                  - type
                  - selector
              - type: object
                title: Write text
                properties:
                  type:
                    type: string
                    enum:
                      - write
                    description: >-
                      Write text into an input field, text area, or
                      contenteditable element. Note: You must first focus the
                      element using a 'click' action before writing. The text
                      will be typed character by character to simulate keyboard
                      input.
                  text:
                    type: string
                    description: Text to type
                    example: Hello, world!
                required:
                  - type
                  - text
              - type: object
                title: Press a key
                description: >-
                  Press a key on the page. See
                  https://asawicki.info/nosense/doc/devices/keyboard/key_codes.html
                  for key codes.
                properties:
                  type:
                    type: string
                    enum:
                      - press
                    description: Press a key on the page
                  key:
                    type: string
                    description: Key to press
                    example: Enter
                required:
                  - type
                  - key
              - type: object
                title: Scroll
                properties:
                  type:
                    type: string
                    enum:
                      - scroll
                    description: Scroll the page or a specific element
                  direction:
                    type: string
                    enum:
                      - up
                      - down
                    description: Direction to scroll
                    default: down
                  selector:
                    type: string
                    description: Query selector for the element to scroll
                    example: '#my-element'
                required:
                  - type
              - type: object
                title: Scrape
                properties:
                  type:
                    type: string
                    enum:
                      - scrape
                    description: >-
                      Scrape the current page content, returns the url and the
                      html.
                required:
                  - type
              - type: object
                title: Execute JavaScript
                properties:
                  type:
                    type: string
                    enum:
                      - executeJavascript
                    description: Execute JavaScript code on the page
                  script:
                    type: string
                    description: JavaScript code to execute
                    example: document.querySelector('.button').click();
                required:
                  - type
                  - script
              - type: object
                title: Generate PDF
                properties:
                  type:
                    type: string
                    enum:
                      - pdf
                    description: >-
                      Generate a PDF of the current page. The PDF will be
                      returned in the `actions.pdfs` array of the response.
                  format:
                    type: string
                    enum:
                      - A0
                      - A1
                      - A2
                      - A3
                      - A4
                      - A5
                      - A6
                      - Letter
                      - Legal
                      - Tabloid
                      - Ledger
                    description: The page size of the resulting PDF
                    default: Letter
                  landscape:
                    type: boolean
                    description: Whether to generate the PDF in landscape orientation
                    default: false
                  scale:
                    type: number
                    description: The scale multiplier of the resulting PDF
                    default: 1
                required:
                  - type
        location:
          type: object
          description: >-
            Location settings for the request. When specified, this will use an
            appropriate proxy if available and emulate the corresponding
            language and timezone settings. Defaults to 'US' if not specified.
          properties:
            country:
              type: string
              description: ISO 3166-1 alpha-2 country code (e.g., 'US', 'AU', 'DE', 'JP')
              pattern: ^[A-Z]{2}$
              default: US
            languages:
              type: array
              description: >-
                Preferred languages and locales for the request in order of
                priority. Defaults to the language of the specified location.
                See
                https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
              items:
                type: string
                example: en-US
        removeBase64Images:
          type: boolean
          description: >-
            Removes all base 64 images from the output, which may be
            overwhelmingly long. The image's alt text remains in the output, but
            the URL is replaced with a placeholder.
          default: true
        blockAds:
          type: boolean
          description: Enables ad-blocking and cookie popup blocking.
          default: true
        proxy:
          type: string
          enum:
            - basic
            - stealth
            - auto
          description: |-
            Specifies the type of proxy to use.

             - **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.
             - **stealth**: Stealth proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites. Costs up to 5 credits per request.
             - **auto**: Firecrawl will automatically retry scraping with stealth proxies if the basic proxy fails. If the retry with stealth is successful, 5 credits will be billed for the scrape. If the first attempt with basic is successful, only the regular cost will be billed.

            If you do not specify a proxy, Firecrawl will default to basic.
        storeInCache:
          type: boolean
          description: >-
            If true, the page will be stored in the Firecrawl index and cache.
            Setting this to false is useful if your scraping activity may have
            data protection concerns. Using some parameters associated with
            sensitive scraping (actions, headers) will force this parameter to
            be false.
          default: true
    ScrapeOptions:
      allOf:
        - $ref: '#/components/schemas/BaseScrapeOptions'
        - type: object
          properties:
            formats:
              type: array
              items:
                type: string
                enum:
                  - markdown
                  - html
                  - rawHtml
                  - links
                  - screenshot
                  - screenshot@fullPage
                  - json
                  - changeTracking
              description: Formats to include in the output.
              default:
                - markdown
            changeTrackingOptions:
              type: object
              description: >-
                Options for change tracking (Beta). Only applicable when
                'changeTracking' is included in formats. The 'markdown' format
                must also be specified when using change tracking.
              properties:
                modes:
                  type: array
                  items:
                    type: string
                    enum:
                      - git-diff
                      - json
                  description: >-
                    The mode to use for change tracking. 'git-diff' provides a
                    detailed diff, and 'json' compares extracted JSON data.
                schema:
                  type: object
                  description: >-
                    Schema for JSON extraction when using 'json' mode. Defines
                    the structure of data to extract and compare. Must conform
                    to [JSON Schema](https://json-schema.org/).
                prompt:
                  type: string
                  description: >-
                    Prompt to use for change tracking when using 'json' mode. If
                    not provided, the default prompt will be used.
                tag:
                  type: string
                  nullable: true
                  default: null
                  description: >-
                    Tag to use for change tracking. Tags can separate change
                    tracking history into separate "branches", where change
                    tracking with a specific tagwill only compare to scrapes
                    made in the same tag. If not provided, the default tag
                    (null) will be used.

````